import postgres from "postgres";
import MediaListingWrapper from "@/app/components/MediaListingWrapper";

async function getListings() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  return await sql`
    SELECT media_items.id, media_items.title, formats.name AS format
    FROM media_items
    JOIN formats ON media_items.format_id = formats.id
    ORDER BY media_items.created_at DESC
  `;
}

export default async function MediaListing() {
  const listings = await getListings();

  return (
    <MediaListingWrapper
      tableHeader={(<>
        <th className="border border-gray-300 p-2">Title</th>
        <th className="border border-gray-300 p-2">Format</th>
      </>)}
    >
      {listings.map((listing) => (
        <tr key={listing.id}>
          <td className="border border-gray-300 p-2">{listing.title}</td>
          <td className="border border-gray-300 p-2">{listing.format}</td>
        </tr>
      ))}
    </MediaListingWrapper>
  );
}
