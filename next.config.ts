import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Server-only packages that must not be bundled (native modules / dynamic requires).
    serverExternalPackages: ["mongoose", "bcrypt", "agenda", "nodemailer", "cloudinary"],
};

export default nextConfig;
