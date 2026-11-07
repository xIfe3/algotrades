"use client";

/**
 * Small compatibility layer that exposes the subset of the react-router-dom API
 * this app used (Link, useNavigate, useLocation, Navigate, useOutletContext),
 * implemented on top of Next.js App Router navigation.
 */
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    AnchorHTMLAttributes,
    ReactNode,
    createContext,
    forwardRef,
    useContext,
    useEffect,
} from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    to: string;
    replace?: boolean;
    children?: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
    { to, replace, children, ...rest },
    ref
) {
    return (
        <NextLink href={to} replace={replace} ref={ref} {...rest}>
            {children}
        </NextLink>
    );
});

type NavigateOptions = { replace?: boolean; state?: unknown };

export function useNavigate() {
    const router = useRouter();
    return (to: string | number, options: NavigateOptions = {}) => {
        if (typeof to === "number") {
            if (to < 0) router.back();
            else router.forward();
            return;
        }
        if (options.replace) router.replace(to);
        else router.push(to);
    };
}

export function useLocation() {
    const pathname = usePathname() || "/";
    const searchParams = useSearchParams();
    const query = searchParams?.toString();
    return {
        pathname,
        search: query ? `?${query}` : "",
        hash: typeof window !== "undefined" ? window.location.hash : "",
        state: null as unknown,
    };
}

export function Navigate({ to, replace }: { to: string; replace?: boolean; state?: unknown }) {
    const router = useRouter();
    useEffect(() => {
        if (replace) router.replace(to);
        else router.push(to);
    }, [to, replace, router]);
    return null;
}

/* Replacement for <Outlet context={...} /> + useOutletContext() */
const OutletContext = createContext<unknown>(undefined);

export function OutletContextProvider({
    value,
    children,
}: {
    value: unknown;
    children: ReactNode;
}) {
    return <OutletContext.Provider value={value}>{children}</OutletContext.Provider>;
}

export function useOutletContext<T = unknown>(): T {
    return useContext(OutletContext) as T;
}
