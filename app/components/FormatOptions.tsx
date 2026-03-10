import postgres from "postgres";

async function getFormats() {
  const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

  return await sql`SELECT id, name FROM formats ORDER BY name`;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unable to load formats.";
}

export default async function FormatOptions() {
  try {
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
  } catch (error) {
    return (
      <>
        <label htmlFor="format">Format:</label>
        <select
          className="border border-gray-300 p-2 w-full"
          id="format"
          name="format"
          disabled
        >
          <option>Unable to load formats</option>
        </select>
        <p className="mt-2 text-sm text-red-700" role="alert">
          {getErrorMessage(error)}
        </p>
      </>
    );
  }
}
