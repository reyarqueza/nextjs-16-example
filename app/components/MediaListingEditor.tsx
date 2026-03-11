import {Suspense} from "react";
import MediaTableBody from "@/app/components/MediaTableBody";
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
      media_items.id, media_items.title, formats.name
    AS
      format
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

export default function MediaListing() {
  const listings = getListings();

  return (
    <MediaListingWrapper
      tableHeader={(<>
        <th className="border border-gray-300 p-2">Title</th>
        <th className="border border-gray-300 p-2 w-[150px]">Format</th>
        <th className="border border-gray-300 p-2 w-[200px]">Actions</th>
      </>)}
    >
      <Suspense fallback={<tr><td className="text-lg p-2" colSpan={3}>Streaming...</td></tr>}>
        <MediaTableBody
          listings={listings}
        />
      </Suspense>
    </MediaListingWrapper>
  );
}
