/**
 * Minimal Express-compatible request/response/router layer that runs inside a
 * Next.js Route Handler. It lets the original Express controllers, middlewares
 * and route files run unchanged (same paths, same middleware order, same
 * response shapes) while being served by Next.js.
 */
import { NextRequest, NextResponse } from "next/server";

type CookieOptions = {
    httpOnly?: boolean;
    secure?: boolean;
    maxAge?: number; // milliseconds (Express semantics)
    sameSite?: boolean | "lax" | "strict" | "none";
    path?: string;
    domain?: string;
    expires?: Date;
};

export class ApiRequest {
    method: string;
    path: string;
    originalUrl: string;
    body: any;
    params: Record<string, string> = {};
    query: Record<string, string>;
    cookies: Record<string, string>;
    headers: Record<string, string>;
    session: Record<string, any> = {};

    constructor(req: NextRequest, path: string, body: any) {
        this.method = req.method.toUpperCase();
        this.path = path;
        this.originalUrl = req.nextUrl.pathname + req.nextUrl.search;
        this.body = body;
        this.query = Object.fromEntries(req.nextUrl.searchParams.entries());
        this.cookies = Object.fromEntries(
            req.cookies.getAll().map((c) => [c.name, c.value])
        );
        this.headers = {};
        req.headers.forEach((value, key) => {
            this.headers[key.toLowerCase()] = value;
        });
    }

    get(name: string) {
        return this.headers[name.toLowerCase()];
    }
}

type PendingCookie =
    | { kind: "set"; name: string; value: string; options: CookieOptions }
    | { kind: "clear"; name: string; options: CookieOptions };

export class ApiResponse {
    statusCode = 200;
    body: unknown = undefined;
    headersSent = false;
    private cookies: PendingCookie[] = [];
    private extraHeaders: Record<string, string> = {};
    private resolveFinished!: () => void;
    finished: Promise<void>;

    constructor() {
        this.finished = new Promise((resolve) => (this.resolveFinished = resolve));
    }

    status(code: number) {
        this.statusCode = code;
        return this;
    }

    json(data: unknown) {
        this.body = data;
        this.headersSent = true;
        this.resolveFinished();
        return this;
    }

    send(data: unknown) {
        return this.json(data);
    }

    sendStatus(code: number) {
        this.statusCode = code;
        return this.json({ message: String(code) });
    }

    setHeader(name: string, value: string) {
        this.extraHeaders[name] = value;
        return this;
    }

    cookie(name: string, value: string, options: CookieOptions = {}) {
        this.cookies.push({ kind: "set", name, value, options });
        return this;
    }

    clearCookie(name: string, options: CookieOptions = {}) {
        this.cookies.push({ kind: "clear", name, options });
        return this;
    }

    toNextResponse() {
        const response =
            this.body === undefined
                ? new NextResponse(null, { status: this.statusCode })
                : NextResponse.json(this.body, { status: this.statusCode });

        for (const [k, v] of Object.entries(this.extraHeaders)) {
            response.headers.set(k, v);
        }

        for (const c of this.cookies) {
            const sameSite =
                c.options.sameSite === true ? "strict" : c.options.sameSite || undefined;
            const base = {
                httpOnly: c.options.httpOnly,
                secure: c.options.secure,
                sameSite: sameSite as "lax" | "strict" | "none" | undefined,
                path: c.options.path || "/",
                domain: c.options.domain,
            };
            if (c.kind === "set") {
                response.cookies.set(c.name, c.value, {
                    ...base,
                    // Express maxAge is in ms, the Set-Cookie Max-Age is in seconds
                    maxAge:
                        c.options.maxAge !== undefined
                            ? Math.floor(c.options.maxAge / 1000)
                            : undefined,
                    expires: c.options.expires,
                });
            } else {
                response.cookies.set(c.name, "", {
                    ...base,
                    expires: new Date(0),
                });
            }
        }

        return response;
    }
}

export type NextFunction = (err?: any) => void;
export type Handler = (req: any, res: any, next: NextFunction) => any;

type Layer =
    | { type: "route"; method: string; pattern: string; handlers: Handler[] }
    | { type: "mount"; pattern: string; handlers: Handler[]; router: RouterImpl };

const splitPath = (p: string) => p.split("/").filter(Boolean);

/** Match `pattern` against the start (prefix) or the whole of `segments`. */
function matchPattern(pattern: string, segments: string[], prefix: boolean) {
    const parts = splitPath(pattern);
    if (prefix ? segments.length < parts.length : segments.length !== parts.length) {
        return null;
    }
    const params: Record<string, string> = {};
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part.startsWith(":")) {
            params[part.slice(1)] = decodeURIComponent(segments[i]);
        } else if (part !== segments[i]) {
            return null;
        }
    }
    return { params, rest: segments.slice(parts.length) };
}

/** Run handlers in order Express-style; resolves true if the chain fell through. */
async function runChain(handlers: Handler[], req: ApiRequest, res: ApiResponse) {
    for (const handler of handlers) {
        let nextCalled = false;
        let nextError: any;
        await handler(req, res, (err?: any) => {
            nextCalled = true;
            nextError = err;
        });
        if (nextError) throw nextError;
        if (!nextCalled) return false;
    }
    return true;
}

class RouterImpl {
    private layers: Layer[] = [];

    private add(method: string, pattern: string, handlers: Handler[]) {
        this.layers.push({ type: "route", method, pattern, handlers });
        return this;
    }

    get(pattern: string, ...handlers: Handler[]) {
        return this.add("GET", pattern, handlers);
    }
    post(pattern: string, ...handlers: Handler[]) {
        return this.add("POST", pattern, handlers);
    }
    put(pattern: string, ...handlers: Handler[]) {
        return this.add("PUT", pattern, handlers);
    }
    patch(pattern: string, ...handlers: Handler[]) {
        return this.add("PATCH", pattern, handlers);
    }
    delete(pattern: string, ...handlers: Handler[]) {
        return this.add("DELETE", pattern, handlers);
    }
    all(pattern: string, ...handlers: Handler[]) {
        return this.add("ALL", pattern, handlers);
    }

    use(pattern: string, ...rest: (Handler | RouterImpl)[]) {
        const router = rest[rest.length - 1];
        if (!(router instanceof RouterImpl)) {
            throw new Error("router.use() expects a Router as its last argument");
        }
        this.layers.push({
            type: "mount",
            pattern,
            handlers: rest.slice(0, -1) as Handler[],
            router,
        });
        return this;
    }

    /** Returns true if a layer handled the request. */
    async handle(req: ApiRequest, res: ApiResponse, segments: string[]): Promise<boolean> {
        for (const layer of this.layers) {
            if (layer.type === "mount") {
                const m = matchPattern(layer.pattern, segments, true);
                if (!m) continue;
                if (!(await runChain(layer.handlers, req, res))) return true;
                if (await layer.router.handle(req, res, m.rest)) return true;
                continue;
            }

            const methodMatches =
                layer.method === "ALL" ||
                layer.method === req.method ||
                (layer.method === "GET" && req.method === "HEAD");
            if (!methodMatches) continue;

            const m = matchPattern(layer.pattern, segments, false);
            if (!m) continue;

            req.params = { ...req.params, ...m.params };
            if (!(await runChain(layer.handlers, req, res))) return true;
        }
        return false;
    }
}

export function Router() {
    return new RouterImpl();
}

export type { RouterImpl };

const express = { Router };
export default express;
