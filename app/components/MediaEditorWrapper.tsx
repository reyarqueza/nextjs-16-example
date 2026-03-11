import {Suspense} from "react";
import MediaEditor from "@/app/components/MediaEditor";
import MediaListingWrapper from "@/app/components/MediaListingWrapper";
import postgres from "postgres";

async function getListings() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  // Add 1.5-second delay here to simulate slow query
  await new Promise(resolve => setTimeout(resolve, 1500));

  return sql`
    SELECT 
      media_items.id, media_items.title, 
      formats.id AS format_id, 
      formats.name AS format_name
    FROM
      media_items
    JOIN
      formats
    ON
      media_items.format_id = formats.id
    ORDER BY
      media_items.created_at DESC
  `;
}

async function getFormats() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  return sql`
    SELECT
      id, name
    FROM
      formats
    ORDER BY
      id
  `;
}

export default function MediaEditorWrapper() {
  const listings = getListings();
  const formats = getFormats();

  return (
    <MediaListingWrapper
      headerText="Edit Listing"
      isGrid={true}
      tableHeader={(<>
        <div className="border border-gray-300 p-2 text-center font-bold">Title</div>
        <div className="border border-gray-300 p-2 text-center font-bold">Format</div>
        <div className="border border-gray-300 p-2 text-center font-bold">Actions</div>
      </>)}
    >
      <Suspense fallback={<div className="text-lg p-2 col-span-3">Streaming...</div>}>
        <MediaEditor listings={listings} formats={formats} />
      </Suspense>
    </MediaListingWrapper>
  );
}
