import { Suspense } from "react";
import { redirect } from "next/navigation";
import postgres from "postgres";
import FormatOptions from "@/app/components/FormatOptions";
import AddMediaItemSubmit from "@/app/components/AddMediaItemSubmit";
import { updateTag } from "next/cache";

export type ManagePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to save the media item.";
}

async function addMediaItem(formData: FormData) {
  "use server";

  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  const title = formData.get("title") as string | null;
  const formatId = formData.get("format") as string | null;

  if (!title || !formatId) {
    redirect("/manage?error=Title%20and%20format%20are%20required");
  }

  try {
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
