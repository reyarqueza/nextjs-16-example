import postgres from "postgres";
import { Users as UsersType, MediaItem as Media } from "@/app/lib/definitions";

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


async function mediaItems(): Promise<Media[]> {
  try {
    const result = await sql`SELECT
      m.id,
      m.title
    FROM
      medias m` as Media[];

    return result;
  } catch (error) {
    console.error("Error fetching medias:", error);
    throw new Error("Failed to fetch medias. Please try again later.");
  }
}

async function mediaTypes(): Promise<{ id: number; name: string }[]> {
  try {
    const result = await sql`SELECT
      id,
      name
    FROM
      media_types` as { id: number; name: string }[];

    return result;
  } catch (error) {
    console.error("Error fetching media types:", error);
    throw new Error("Failed to fetch media types. Please try again later.");
  }
}

function DropDown({ label, options }: { label: string; options: { id: number; name: string }[] }) {
  return (
    <>
      <label htmlFor={label}>{label}:</label>
      <select id={label} name={label} className="border border-gray-300 py-1 px-2 ml-2 mr-10">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>
        ))}
      </select>
    </>
  );
}

async function Medias() {
  "use cache";

  try {
    const data = await mediaItems();

    return (
      <DropDown label="Media Titles" options={data.map(media => ({ id: media.id, name: media.title }))} />
    );
  } catch (error) {
    return <div>Error loading media items. Please try again later.</div>;
  }
}

async function Users() {
  "use cache";

  try {
    const data = await users();

    return (
      <DropDown label="Users" options={data.map(user => ({ id: user.id, name: user.username }))} />
    );
  } catch (error) {
    return <div>Error loading users. Please try again later.</div>;
  }
}

async function MediaTypes() {
  "use cache";

  try {
    const data = await mediaTypes();

    return (
      <DropDown label="Media Types" options={data} />
    );
  } catch (error) {
    return <div>Error loading media types. Please try again later.</div>;
  }
}

export default function UserCollectionInput() {
  return (
    <form>
      <fieldset className="border border-gray-300 p-6 pt-5 mb-4">
        <legend className="font-bold px-2">User Collection Input</legend>
        <Users />
        <Medias />
        <MediaTypes />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 border border-blue-700 rounded">
          Submit
        </button>
        <button type="reset" className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-4 border border-gray-700 rounded ml-2">
          Reset
        </button>
      </fieldset>
    </form>
  )
}
