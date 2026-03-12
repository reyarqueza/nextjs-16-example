"use client";

import { Row, RowList } from "postgres";
import { use, useActionState, startTransition } from "react";
import MediaForm from "@/app/components/MediaForm";
import { updateListing, deleteListing } from "@/app/actions";

export default function MediaEditor({
  listings,
  formats,
}: {
  listings: Promise<RowList<Row[]>>;
  formats: Promise<RowList<Row[]>>;
}) {
  const allListings = use(listings);
  const allFormats = use(formats);

  return (
    <>
      {allListings.map((listing, index) => (
        <form
          action={updateListing}
          className={`border border-gray-200 grid grid-cols-3 ${index % 2 === 0 
            ? 'bg-gray-100' 
            : 'bg-white'
          }`}
          key={`${String(listing.id)}-${String(listing.format_id ?? "")}-${String(listing.title ?? "")}`}
        >
          <MediaForm listing={listing} allFormats={allFormats} />
        </form>
      ))}
    </>
  );
}
