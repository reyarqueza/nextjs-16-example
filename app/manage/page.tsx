
import NewestTitle from "@/app/components/NewestTitle";
import MediaListing from "@/app/components/MediaListing";
import AddMediaItem from "@/app/components/AddMediaItem";
import type { ManagePageProps } from "@/app/components/AddMediaItem";

export default async function Page({ searchParams }: ManagePageProps) {
  return (
    <>
      <div className="flex gap-10">
        <div className="flex-2">
          <NewestTitle />
          <MediaListing />
        </div>
        <div className="flex-1">
          <AddMediaItem searchParams={searchParams} />
        </div>
      </div>
    </>
  )
}
