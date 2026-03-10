import { Suspense } from "react";
import FormatOptions from "@/app/components/FormatOptions";
import postgres from "postgres";

async function addMediaItem(formData: FormData) {
  "use server";

  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  const title = formData.get("title") as string | null;
  const formatId = formData.get("format") as string | null;

  if (!title || !formatId) {
    throw new Error("Title and format are required");
  }

  await sql`
    INSERT INTO media_items (title, format_id)
    VALUES (${title}, ${formatId})
    RETURNING id
  `;
}

export default function Page() {
  return (<>
    <h1 className="font-bold text-2xl">Manage Page</h1>
    <form action={addMediaItem}>
      <fieldset className="border border-gray-300 p-4">
        <legend className="font-semibold">Add Media Item</legend>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title:</label>
          <input type="text" id="title" name="title" required className="border border-gray-300 p-2 w-full" />
        </div>
        <div className="mb-4">
          <Suspense fallback={<option>Loading...</option>}>
            <FormatOptions />
          </Suspense>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Media Item</button>
      </fieldset>
    </form>
  </>)
}