"use client";

import { ReactNode } from "react";
import PublicLayout from "@/layout/PublicLayout";

export default function Layout({ children }: { children: ReactNode }) {
    return <PublicLayout>{children}</PublicLayout>;
}
