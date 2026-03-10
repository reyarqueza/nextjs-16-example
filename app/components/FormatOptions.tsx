import postgres from "postgres";

async function getFormats() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  return await sql`SELECT id, name FROM formats ORDER BY name`;
}

export default async function FormatOptions() {
  const formats = await getFormats();
  return (<>
    <label htmlFor="format">Format:</label>
    <select className="border border-gray-300 p-2 w-full" id="format" name="format" required>
      <option value="">Select a format</option>
      {formats.map((format) => (
      <option key={format.id} value={format.id}>
        {format.name}
      </option>
      ))}
    </select>
  </>);
}