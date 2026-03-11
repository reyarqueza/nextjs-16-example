import { Row, RowList } from "postgres";
import { useState } from "react";

export default function MediaForm({
  listing,
  allFormats,
}: {
  listing: Row;
  allFormats: RowList<Row[]>;
}) {
  const [listingTitle, setListingTitle] = useState(listing.title);
  const [listingFormatId, setListingFormatId] = useState(listing.format_id);

  return (
    <>
      <div className="p-2 flex items-center">
        <input
          className="border border-gray-300 p-2 w-full bg-white"
          value={listingTitle}
          onChange={(e) => setListingTitle(e.target.value)}
        />
      </div>
      <div className="p-2 flex items-center">
        <select
          value={listingFormatId}
          className="border border-gray-300 p-2 w-full bg-white"
          onChange={(e) => setListingFormatId(e.target.value)}
        >
          <option value="" disabled>Select a format</option>
          {allFormats.map((format) => (
            <option key={format.id} value={format.id}>
              {format.name}
            </option>
          ))}
        </select>
      </div>
      <div className="p-2 flex gap-6 justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white w-full rounded">
          Save
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white w-full rounded">
          Delete
        </button>
      </div>
    </>
  );
}
