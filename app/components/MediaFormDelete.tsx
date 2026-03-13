"use client";

import type { Row, RowList } from "postgres";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function MediaFormDelete({
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
      <div className="p-2 flex justify-center">
        <button
          type="submit"
          disabled={pending}
          className="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white rounded px-3"
        >
          {pending ? "Working..." : "Delete"}
        </button>
      </div>
    </>
  );
}
