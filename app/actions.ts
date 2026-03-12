"use server";

import postgres from "postgres";
import { revalidatePath } from "next/cache";

function requireFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    throw new Error(`Expected form field "${key}" to be a string.`);
  }
  return value;
}

function requireFormInt(formData: FormData, key: string) {
  const raw = requireFormString(formData, key);
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value)) {
    throw new Error(`Expected form field "${key}" to be an integer.`);
  }
  return value;
}

async function updateListing(formData: FormData) {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  try {
    const id = requireFormInt(formData, "id");
    const title = requireFormString(formData, "title");
    const formatId = requireFormInt(formData, "formatId");

    await sql`
      UPDATE media_items
      SET title = ${title}, format_id = ${formatId}
      WHERE id = ${id}
    `;

    revalidatePath("/manage");
  } catch (error) {
    console.error("Error updating listing:", error);
  }
}

async function deleteListing(formData: FormData) {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  const id = requireFormInt(formData, "id");

  await sql`
    DELETE FROM media_items
    WHERE id = ${id}
  `;

  revalidatePath("/manage");
}

export { updateListing, deleteListing };
