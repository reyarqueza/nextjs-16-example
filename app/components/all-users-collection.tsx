import postgres from 'postgres';
import { UsersCollection } from '@/app/lib/definitions';

async function allUsersCollection(): Promise<UsersCollection[]> {
  try {
    const sql = postgres(process.env.POSTGRES_URL!, {
      ssl: 'require',
    });

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
      media_types mt ON m.media_type_id = mt.id` as UsersCollection[];

    return result;
  } catch (error) {
    console.error('Error fetching users collection:', error);
    throw new Error('Failed to fetch users collection. Please try again later.');
  }
}

export default async function AllUsersCollection() {
  try {
    const data = await allUsersCollection();

    return (
      <>{data.map((item) => (
        <table key={item.username} className="table-auto border w-full">
          <tbody>
            <tr>
              <th className="border border-gray-200 p-2">Username</th>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Media Type</th>
            </tr>
            <tr>
              <td className="border border-gray-200 p-2">{item.username}</td>
              <td className="border border-gray-200 p-2">{item.title}</td>
              <td className="border border-gray-200 p-2">{item.media_type}</td>
            </tr>
          </tbody>
        </table>
      ))}</>
    );
  } catch (error) {
    return <div>Error loading users collection. Please try again later.</div>;
  }
}
