"use client";

import type { Row, RowList } from "postgres";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButtons() {
  const { pending } = useFormStatus();

  return (
    <div className="p-2 flex gap-6 justify-center">
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white w-full rounded py-2"
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
      <button
        type="submit"
        disabled={pending}
        className="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white w-full rounded py-2"
      >
        {pending ? "Working..." : "Delete"}
      </button>
    </div>
  );
}

export default function MediaForm({
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

  return (
    <>
      <div className="p-2 flex items-center">
        <input type="hidden" name="id" value={listing.id} />
        <label htmlFor="title" className="sr-only block text-sm font-medium text-gray-700 mr-2">
          Title:
        </label>
        <input
          id="title"
          name="title"
          className="border border-gray-300 p-2 w-full bg-white"
          value={listingTitle}
          onChange={(e) => setListingTitle(e.target.value)}
        />
      </div>
      <div className="p-2 flex items-center">
        <label htmlFor="formatId" className="sr-only block text-sm font-medium text-gray-700 mr-2">
          Format:
        </label>
        <select
          id="formatId"
          name="formatId"
          value={listingFormatId}
          className="border border-gray-300 p-2 w-full bg-white"
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
      <SubmitButtons />
    </>
  );
}
