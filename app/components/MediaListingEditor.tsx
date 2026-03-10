import {Suspense} from "react";
import MediaTableBody from "@/app/components/MediaTableBody";

export default async function MediaListing() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Listings</h1>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2 w-[150px]">Format</th>
            <th className="border border-gray-300 p-2 w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={<tr><td className="text-lg p-2" colSpan={3}>Streaming...</td></tr>}>
            <MediaTableBody />
          </Suspense>
        </tbody>
    </table>
    </>
  );
}