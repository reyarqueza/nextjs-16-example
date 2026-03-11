"use client";

import { Row, RowList } from "postgres";
import { use } from "react";
import MediaForm from "@/app/components/MediaForm";

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
        <form className={`border border-gray-200 grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={listing.id}>
          <MediaForm listing={listing} allFormats={allFormats} />
        </form>
      ))}
    </>
  );
}
