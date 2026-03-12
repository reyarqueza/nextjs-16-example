import type { NextConfig } from "next";

const serverActionAllowedOrigins = () => {
  const allowed = new Set<string>();
  const isCodespaces =
    process.env.CODESPACES === "true" || Boolean(process.env.CODESPACE_NAME);
  const isDev = process.env.NODE_ENV === "development";

  // When developing in GitHub Codespaces, you may access the dev server via:
  // - a forwarded port on your local machine (Origin: localhost:3000)
  // - the public codespaces URL (Origin: *.app.github.dev)
  // In that setup Next.js may see `x-forwarded-host` from the codespaces URL
  // while the browser sends an Origin of localhost, which triggers Server Actions'
  // CSRF protection unless explicitly allowed.
  if (isDev || isCodespaces) {
    allowed.add("localhost:3000");
    allowed.add("127.0.0.1:3000");
    allowed.add("0.0.0.0:3000");
  }

  if (isCodespaces) {
    allowed.add("*.app.github.dev");
    // Prefer allowing the current codespace's exact hostname as well.
    if (process.env.CODESPACE_NAME) {
      allowed.add(`${process.env.CODESPACE_NAME}-3000.app.github.dev`);
    }
  }

  // Optional escape hatch for custom environments (comma-separated).
  // Example: NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS="example.com,localhost:3000"
  if (process.env.NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS) {
    for (const origin of process.env.NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS.split(
      ","
    )) {
      const trimmed = origin.trim();
      if (trimmed) allowed.add(trimmed);
    }
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
