
import { Suspense } from "react";
import NewestTitle from "@/app/components/NewestTitle";
import MediaEditorWrapper from "@/app/components/MediaEditorWrapper";
import AddMediaItem from "@/app/components/AddMediaItem";
import type { ManagePageProps } from "@/app/components/AddMediaItem";

function AddMediaItemFallback() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className="border border-gray-300 p-4">
        <div className="font-semibold px-2">Add Media Item</div>
        <div className="mt-4 text-sm text-gray-600">Loading…</div>
      </div>
    </div>
  );
}

export default async function Page({ searchParams }: ManagePageProps) {
  return (
    <>
      <div className="flex gap-10">
        <div className="flex-2">
          <NewestTitle />
          <MediaEditorWrapper />
        </div>
        <div className="flex-1">
          <Suspense fallback={<AddMediaItemFallback />}>
            <AddMediaItem searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
