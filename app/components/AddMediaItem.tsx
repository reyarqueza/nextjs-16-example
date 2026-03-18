import { Suspense } from "react";
import { redirect } from "next/navigation";
import FormatOptions from "@/app/components/FormatOptions";
import AddMediaItemSubmit from "@/app/components/AddMediaItemSubmit";
import { updateTag } from "next/cache";
import { sql } from "@/app/lib/db";

export type ManagePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const URL_SCHEME_REGEX = /\b[a-z][a-z0-9+.-]{1,15}:\/\/\S+/i;
const WWW_REGEX = /\bwww\.\S+/i;
const DOMAIN_REGEX =
  /\b(?:[a-z0-9-]{1,63}\.)+(?:com|net|org|io|co|edu|gov|me|app|dev|gg|tv|fm|biz|info|xyz|site|store|shop|online|us|uk|ca|au|de|fr|jp|cn|ru)\b/i;
const BOX_DRAWING_OR_BRAILLE_REGEX = /[\u2500-\u257F\u2580-\u259F\u2800-\u28FF]/;
const REPEATED_SYMBOL_REGEX = /([^\p{L}\p{N}\s])\1{5,}/u;

function normalizeSingleLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function assertNoUrlLike(value: string) {
  if (URL_SCHEME_REGEX.test(value) || WWW_REGEX.test(value) || DOMAIN_REGEX.test(value)) {
    throw new Error("Please remove URLs from the title.");
  }
}

function assertNoAsciiArtLike(rawValue: string, normalizedValue: string) {
  if (BOX_DRAWING_OR_BRAILLE_REGEX.test(rawValue) || REPEATED_SYMBOL_REGEX.test(rawValue)) {
    throw new Error("Please remove ASCII art from the title.");
  }

  const compact = normalizedValue.replace(/\s/g, "");
  if (compact.length >= 20) {
    const lettersAndNumbers = compact.match(/[\p{L}\p{N}]/gu)?.length ?? 0;
    const ratio = lettersAndNumbers / compact.length;
    if (ratio < 0.4) {
      throw new Error("Please remove ASCII art from the title.");
    }
  }
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to save the media item.";
}

async function addMediaItem(formData: FormData) {
  "use server";

  const rawTitle = formData.get("title");
  const rawFormatId = formData.get("format");

  if (typeof rawTitle !== "string" || typeof rawFormatId !== "string") {
    redirect("/manage?error=Title%20and%20format%20are%20required");
  }

  try {
    const title = normalizeSingleLine(rawTitle);
    const formatId = Number.parseInt(rawFormatId, 10);

    if (!title || !Number.isFinite(formatId)) {
      redirect("/manage?error=Title%20and%20format%20are%20required");
    }

    if (title.length > 200) {
      throw new Error("Title must be 200 characters or fewer.");
    }

    assertNoUrlLike(rawTitle);
    assertNoAsciiArtLike(rawTitle, title);

    await sql`
      INSERT INTO media_items (title, format_id)
      VALUES (${title}, ${formatId})
      RETURNING id
    `;
  } catch (error) {
    redirect(`/manage?error=${encodeURIComponent(getErrorMessage(error))}`);
  }

  updateTag("listings");
  redirect("/manage");
}

export default async function AddMediaItem({ searchParams }: ManagePageProps) {
  const { error } = await searchParams;
  const alreadyInDb = 'duplicate key value violates unique constraint "media_items_unique_title_format"';
  const classBgColor = error == alreadyInDb ? 'bg-blue-50' : 'bg-red-50';
  const classTxtColor = error == alreadyInDb ? 'text-blue-700' : 'text-red-700';
  const classBorderColor = error == alreadyInDb ? 'border-blue-700' : 'border-red-700';

  return (
    <>
      {error ? (
        <p className={`mb-4 rounded border ${classBorderColor} ${classBgColor} p-3 ${classTxtColor}`} role="alert">
          {error == alreadyInDb ? "That title and format is already in our database, but thanks for your contribution!" : error}
        </p>
      ) : null}
      <form action={addMediaItem}>
        <fieldset className="border border-gray-300 p-4">
          <legend className="font-semibold px-2">Add Media Item</legend>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">Title:</label>
            <input type="text" id="title" name="title" required className="border border-gray-300 p-2 w-full" />
          </div>
          <div className="mb-4">
            <Suspense fallback={
              <>
                <label htmlFor="format">Format:</label>
                <select className="border border-gray-300 p-2 w-full" id="format" name="format" disabled>
                  <option>Loading formats...</option>
                </select>
              </>
            }>
              <FormatOptions />
            </Suspense>
          </div>
          <AddMediaItemSubmit />
        </fieldset>
      </form>
    </>
  )
}
