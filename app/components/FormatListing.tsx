import postgres from "postgres";
import {Suspense} from "react";

async function getFormats() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  // Add 1-second delay here to simulate slow query
  await new Promise(resolve => setTimeout(resolve, 1000));

  return await sql`SELECT
    id, name
  FROM
    formats
  ORDER BY id` as { id: number; name: string }[];
}

async function FormatList() {
  const formats = await getFormats();

  return (
    <ul className="flex">
      {formats.map((format) => (
        <li className="mr-5" key={format.id}>{format.name}</li>
      ))}
    </ul>
  );
}

export default async function FormatListing() {
  return (
    <div className={"border border-gray-300 p-4 w-[50vw] mb-8"}>
      <h2 className="font-bold text-xl mb-4">Current Formats</h2>
      <Suspense fallback={<div>Streaming formats...</div>}>
        <FormatList />
      </Suspense>
    </div>
  );
}
