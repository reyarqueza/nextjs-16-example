import postgres from "postgres";
import { Users as UsersType } from "@/app/lib/definitions";
import { Suspense } from "react";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function users(): Promise<UsersType[]> {
  try {
    const result = await sql`SELECT
      u.id,
      u.username
    FROM
      users u` as UsersType[];

    // Add 1.5-second delay here to simulate slow query
    await new Promise(resolve => setTimeout(resolve, 1500));

    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users. Please try again later.");
  }
}

async function UserList() {
  try {
    const data = await users();

    return (
      <ul aria-labelledby="user-list-label">
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
    );
  } catch (error) {
    return <div>Error loading users. Please try again later.</div>;
  }
}

export default async function Users({className}: {className?: string}) {
  return (
    <div className={className}>
      <label id="user-list-label" className="font-bold">Users</label>
      <Suspense fallback={<div>Loading...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
}
