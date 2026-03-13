"use client";

import { Row, RowList } from "postgres";
import { use } from "react";
import MediaFormSave from "@/app/components/MediaFormSave";
import MediaFormDelete from "@/app/components/MediaFormDelete";
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
        <div
          key={listing.id}
          className={`border border-gray-200 flex ${index % 2 === 0
            ? 'bg-gray-100'
            : 'bg-white'
          }`}
        >
          <form
            action={updateListing}
            className="flex w-full justify-around"
          >
            <MediaFormSave listing={listing} allFormats={allFormats} />
          </form>
          <form
            action={deleteListing}
            className="flex"
          >
            <MediaFormDelete listing={listing} allFormats={allFormats} />
          </form>
        </div>
      ))}
    </>
  );
}
