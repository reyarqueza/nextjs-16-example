"use client";

import { Row, RowList } from "postgres";
import { use } from "react";

export default function MediaEditor({
  listings,
}: {
  listings: Promise<RowList<Row[]>>;
}) {
  const allListings = use(listings);
  return (
    <>
      {allListings.map((listing) => (
        <tr key={listing.id}>
          <td className="border border-gray-300 p-2">{listing.title}</td>
          <td className="border border-gray-300 p-2">{listing.format}</td>
          <td className="border border-gray-300 p-2 flex gap-2 justify-around">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}