"use client";

import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "@/lib/router";
import useAuth from "../../hooks/useAuth";

// The access token lives in localStorage, so the role check can only run in the
// browser. Render nothing until mounted, then either show the page or redirect.
const RequireAuth = ({
    allowedRoles,
    children,
}: {
    allowedRoles: string[];
    children: ReactNode;
}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { role } = useAuth();

    if (!mounted) return null;

    return allowedRoles.includes(role) ? (
        <>{children}</>
    ) : (
        <Navigate to="/auth/login" replace />
    );
};

export default RequireAuth;
