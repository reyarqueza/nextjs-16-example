"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { sql } from "@/app/lib/db";
import { sanitizeAndValidateTitle } from "@/app/lib/sanitize";

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

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to save changes.";
}

async function updateListing(formData: FormData) {
  try {
    const id = requireFormInt(formData, "id");
    const titleInput = requireFormString(formData, "title");
    const title = sanitizeAndValidateTitle(titleInput);
    const formatId = requireFormInt(formData, "formatId");

    await sql`
      UPDATE media_items
      SET title = ${title}, format_id = ${formatId}
      WHERE id = ${id}
    `;

    revalidatePath("/manage");
  } catch (error) {
    console.error("Error updating listing:", error);
    updateTag("listings");
    revalidatePath("/");
    revalidatePath("/manage");
    redirect(`/manage?error=${encodeURIComponent(getErrorMessage(error))}`);
  }

  updateTag("listings");
  revalidatePath("/");
  redirect("/manage");
}

async function deleteListing(formData: FormData) {
  const id = requireFormInt(formData, "id");

  await sql`
    DELETE FROM media_items
    WHERE id = ${id}
  `;

  revalidatePath("/");
  revalidatePath("/manage");
}

export { updateListing, deleteListing };
