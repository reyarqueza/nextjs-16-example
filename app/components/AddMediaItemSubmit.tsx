"use client";

import { useFormStatus } from "react-dom";

export default function AddMediaItemSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-4 py-2 rounded"
    >
      {pending ? (
        <span className="inline-flex items-center justify-center gap-2">
          <span
            aria-hidden
            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          Adding…
        </span>
      ) : (
        "Add Media Item"
      )}
    </button>
  );
}

