import postgres from "postgres";

async function getListings() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  // Add 1.5-second delay here to simulate slow query
  await new Promise(resolve => setTimeout(resolve, 1500));

  return await sql`
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

export default async function MediaTableBody() {
  const listings = await getListings();

  return (
    <>
      {listings.map((listing) => (
        <tr key={listing.id}>
          <td className="border border-gray-300 p-2">{listing.title}</td>
          <td className="border border-gray-300 p-2">{listing.format}</td>
          <td className="border border-gray-300 p-2 flex gap-2 justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}