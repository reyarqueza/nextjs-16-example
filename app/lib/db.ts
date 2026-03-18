// Authored/updated with assistance from OpenAI Codex CLI (GPT-5.2) on 2026-03-18.
import postgres from "postgres"; // Import the postgres client factory (creates a pooled SQL tagged-template client).

declare global { // Augment the global scope typing (so we can cache the client during dev hot reloads).
  var __sql__: ReturnType<typeof postgres> | undefined; // Optional global singleton cache for the SQL client.
} // End global type augmentation.

function createSql() { // Create a new SQL client instance (used only when no cached instance exists).
  const url = process.env.POSTGRES_URL; // Read the connection string from environment variables.
  if (!url) { // Fail fast with a clear error if the env var is missing.
    throw new Error("POSTGRES_URL is not set"); // Throw so the app doesn't run with an undefined connection string.
  } // End missing-URL guard.

  return postgres(url, { ssl: "require" }); // Create the SQL client, requiring SSL (common for hosted Postgres).
} // End createSql.

export const sql = globalThis.__sql__ ?? createSql(); // Reuse cached client if present; otherwise create one.

if (process.env.NODE_ENV !== "production") { // Only cache globally in dev to avoid multiple pools from hot reloads.
  globalThis.__sql__ = sql; // Store the singleton on the global object for subsequent module reloads.
} // End dev-only global caching.
