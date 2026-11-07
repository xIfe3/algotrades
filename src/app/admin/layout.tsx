"use client";

import { ReactNode } from "react";
import RequireAuth from "@/features/auth/requireAuth";
import AdminLayout from "@/layout/AdminLayout";
import ROLES from "@/config/roles";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <RequireAuth allowedRoles={[ROLES.Admin]}>
            <AdminLayout>{children}</AdminLayout>
        </RequireAuth>
    );
}
