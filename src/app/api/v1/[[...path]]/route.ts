import { NextRequest } from "next/server";
import dbConn from "@/server/config/dbConn";
import apiRoutes from "@/server/routes/index.routes";
import { ApiRequest, ApiResponse } from "@/server/lib/express";
import { logData, logError } from "@/server/utils/logger";
import { CustomError, InternalServerError, NotFoundError } from "@/server/utils/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

process.env.TZ = "Africa/Lagos";

const RESPONSE_TIMEOUT_MS = 30_000;

async function parseBody(req: NextRequest) {
    if (req.method === "GET" || req.method === "HEAD") return {};
    const contentType = req.headers.get("content-type") || "";
    try {
        if (contentType.includes("application/json")) {
            const text = await req.text();
            return text ? JSON.parse(text) : {};
        }
        if (contentType.includes("application/x-www-form-urlencoded")) {
            return Object.fromEntries(new URLSearchParams(await req.text()));
        }
    } catch {
        return {};
    }
    return {};
}

async function handler(
    req: NextRequest,
    ctx: { params: Promise<{ path?: string[] }> }
) {
    const { path = [] } = await ctx.params;
    const res = new ApiResponse();

    if (path.length === 0) {
        logData(res, 200, { message: "API Running!" });
        return res.toNextResponse();
    }

    try {
        await dbConn();

        const apiReq = new ApiRequest(req, "/" + path.join("/"), await parseBody(req));
        const handled = await apiRoutes.handle(apiReq, res, path);

        if (!handled) {
            logError(res, new NotFoundError("Resource not found!"));
        } else if (!res.headersSent) {
            // Some handlers respond from inside a callback; wait for them.
            await Promise.race([
                res.finished,
                new Promise<void>((resolve) => setTimeout(resolve, RESPONSE_TIMEOUT_MS)),
            ]);
            if (!res.headersSent) {
                logError(res, new InternalServerError("No response from handler"));
            }
        }
    } catch (err: any) {
        console.error(err);
        if (!res.headersSent) {
            if (err instanceof CustomError || typeof err?.status === "number") {
                logError(res, err);
            } else {
                logError(res, new InternalServerError(err?.message || "Internal Server Error"));
            }
        }
    }

    return res.toNextResponse();
}

export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as PATCH,
    handler as DELETE,
    handler as HEAD,
};
