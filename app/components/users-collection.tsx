import postgres from "postgres";
import { UsersCollection as UsersCollectionType } from "@/app/lib/definitions";
import UserCollectionInput from "@/app/components/user-collection-input";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function usersCollection(): Promise<UsersCollectionType[]> {
  try {
    const result = await sql`SELECT
      u.username,
      m.title,
      mt.name AS media_type
    FROM
      users u
    JOIN
      users_medias um ON u.id = um.user_id
    JOIN
      medias m ON m.id = um.media_id
    JOIN
      media_types mt ON m.media_type_id = mt.id` as UsersCollectionType[];

    // Add 1.5-second delay here to simulate slow query
    await new Promise(resolve => setTimeout(resolve, 1500));

    return result;
  } catch (error) {
    console.error("Error fetching users collection:", error);
    throw new Error("Failed to fetch users collection. Please try again later.");
  }
}

export default async function UsersCollection() {
  try {
    const data = await usersCollection();

    return (
      <>
        <UserCollectionInput />
        {data.map((item) => (
          <table key={item.username} className="table-auto border w-full">
            <tbody>
              <tr>
                <th className="border border-gray-300 p-2">Username</th>
                <th className="border border-gray-300 p-2">Title</th>
                <th className="border border-gray-300 p-2">Media Type</th>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">{item.username}</td>
                <td className="border border-gray-300 p-2">{item.title}</td>
                <td className="border border-gray-300 p-2">{item.media_type}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </>
    );
  } catch (error) {
    return <div>Error loading users collection. Please try again later.</div>;
  }
}
