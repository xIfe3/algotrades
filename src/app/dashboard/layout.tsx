"use client";

import { ReactNode } from "react";
import RequireAuth from "@/features/auth/requireAuth";
import UserLayout from "@/layout/UserLayout";
import ROLES from "@/config/roles";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <RequireAuth allowedRoles={[ROLES.User]}>
            <UserLayout>{children}</UserLayout>
        </RequireAuth>
    );
}
