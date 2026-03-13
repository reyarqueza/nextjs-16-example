"use client";

import type { Row } from "postgres";
import { useFormStatus } from "react-dom";

export default function MediaFormDelete({
  listing,
}: {
  listing: Row;
}) {

  const { pending } = useFormStatus();

  return (
    <>
      <div className="p-2 flex justify-center">
        <input type="hidden" name="id" value={listing.id} />
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
