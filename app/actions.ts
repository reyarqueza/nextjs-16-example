"use server";

import postgres from "postgres";
import { revalidatePath, refresh  } from "next/cache";
import { redirect } from "next/navigation";

async function updateListing(formData: FormData) {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  try {
    const id = formData.get("id");
    const title = formData.get("title");
    const formatId = formData.get("formatId");

    const result = await sql`
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

  const id = formData.get("id");

  await sql`
    DELETE FROM media_items
    WHERE id = ${id}
  `;

  revalidatePath("/manage");
}

export { updateListing, deleteListing };
