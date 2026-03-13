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
          className="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white rounded px-3 w-[95px]"
        >
          {pending ? (
            <span className="inline-flex items-center justify-center gap-2">
              <span
                aria-hidden
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </>
  );
}
