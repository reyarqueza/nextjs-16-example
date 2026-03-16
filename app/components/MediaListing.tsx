import postgres from "postgres";
import { cacheTag } from 'next/cache'
async function getHomeListings() {
  "use cache";
  cacheTag("listings");

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
  const listings = await getHomeListings();

  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Title</th>
          <th className="border border-gray-300 p-2">Format</th>
        </tr>
      </thead>
      <tbody>
      {listings.map((listing) => (
        <tr key={listing.id}>
          <td className="border border-gray-300 p-2">{listing.title}</td>
          <td className="border border-gray-300 p-2">{listing.format}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}
