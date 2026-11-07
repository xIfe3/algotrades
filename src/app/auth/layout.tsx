"use client";

import { ReactNode } from "react";
import AuthLayout from "@/layout/AuthLayout";

export default function Layout({ children }: { children: ReactNode }) {
    return <AuthLayout>{children}</AuthLayout>;
}
