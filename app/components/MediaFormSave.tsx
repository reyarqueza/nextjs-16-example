"use client";

import type { Row, RowList } from "postgres";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function MediaFormSave({
  listing,
  allFormats,
}: {
  listing: Row;
  allFormats: RowList<Row[]>;
}) {
  const [listingTitle, setListingTitle] = useState(() => String(listing.title ?? ""));
  const [listingFormatId, setListingFormatId] = useState(() =>
    listing.format_id == null ? "" : String(listing.format_id)
  );
  const { pending } = useFormStatus();

  return (
    <>
      <div className="p-2 flex items-center w-2/3">
        <input type="hidden" name="id" value={listing.id} />
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mr-2">
          Title:
        </label>
        <input
          id="title"
          name="title"
          className="border border-gray-300 p-2 bg-white w-full"
          value={listingTitle}
          onChange={(e) => setListingTitle(e.target.value)}
        />
      </div>
      <div className="p-2 flex items-center">
        <label htmlFor="formatId" className="block text-sm font-medium text-gray-700 mr-2">
          Format:
        </label>
        <select
          id="formatId"
          name="formatId"
          value={listingFormatId}
          className="border border-gray-300 p-2 bg-white"
          onChange={(e) => setListingFormatId(e.target.value)}
        >
          <option value="" disabled>
            Select a format
          </option>
          {allFormats.map((format) => (
            <option key={format.id} value={String(format.id)}>
              {format.name}
            </option>
          ))}
        </select>
      </div>
      <div className="p-2 flex justify-center">
        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded px-3"
        >
          {pending ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </>
  );
}
