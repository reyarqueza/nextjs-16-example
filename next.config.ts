import type { NextConfig } from "next";

const serverActionAllowedOrigins = () => {
  const allowed = new Set<string>();

  // When developing in GitHub Codespaces, you may access the dev server via:
  // - a forwarded port on your local machine (Origin: localhost:3000)
  // - the public codespaces URL (Origin: *.app.github.dev)
  // In that setup Next.js may see `x-forwarded-host` from the codespaces URL
  // while the browser sends an Origin of localhost, which triggers Server Actions'
  // CSRF protection unless explicitly allowed.
  if (process.env.NODE_ENV === "development") {
    allowed.add("localhost:3000");
    allowed.add("127.0.0.1:3000");
    allowed.add("0.0.0.0:3000");
    allowed.add("*.app.github.dev");
  }

  return Array.from(allowed);
};

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: serverActionAllowedOrigins(),
    },
  },
};

export default nextConfig;
