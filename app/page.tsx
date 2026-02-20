// File: app/page.tsx
import { neon } from '@neondatabase/serverless';

export default function Home() {
  async function test(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);

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
      media_types mt ON m.media_type_id = mt.id`;

    console.log(result);
  }

  return (
  <>
    Home Page
    <form action={test}>
      <button type="submit">Run Test</button>
    </form>
  </>
  );
}
