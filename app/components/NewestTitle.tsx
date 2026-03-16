import postgres from "postgres";
import {Suspense} from "react";
import { cacheTag } from 'next/cache'

async function getNewestTitle() {
  "use cache";
  cacheTag("listings");

  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  // // Add 1.5-second delay here to simulate slow query
  // await new Promise(resolve => setTimeout(resolve, 1500));

  return await sql`
    SELECT
      title
    FROM
      media_items
    ORDER BY
      id
    DESC LIMIT 1
  `;
}

async function NewTitleComponent() {
  const result = await getNewestTitle();

  return (
    <p className="text-lg">{result[0]?.title ?? "No titles found"}</p>
  );
}

export default async function NewestTitle() {
  return (
    <div className={"border border-gray-300 p-4 w-[50vw] mb-8"}>
      <h2 className="font-bold text-xl mb-4">Newest Title</h2>
      <Suspense fallback={<div className="text-lg">Streaming...</div>}>
        <NewTitleComponent />
      </Suspense>
    </div>
  );
}
