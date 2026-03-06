import postgres from "postgres";
import { MediaItem } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function medias(): Promise<MediaItem[]> {
  try {
    const result = await sql`SELECT
      m.id,
      m.title,
      mt.name AS media_type
    FROM
      medias m
    JOIN
      media_types mt ON m.media_type_id = mt.id` as MediaItem[];

    return result;
  } catch (error) {
    console.error("Error fetching medias:", error);
    throw new Error("Failed to fetch medias. Please try again later.");
  }
}

export default async function Medias() {
  "use cache";

  try {
    const data = await medias();

    return (
      <>
        <table className="table-auto border w-full">
          <tbody>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Media Type</th>
            </tr>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.title}</td>
                <td className="border border-gray-300 p-2">{item.media_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } catch (error) {
    return <div>Error loading medias. Please try again later.</div>;
  }
}
