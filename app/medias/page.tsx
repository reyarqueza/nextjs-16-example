import PageNav from "@/app/page-nav";
import Medias from '@/app/components/medias';
import Users from "@/app/components/users";

export default async function Page() {
  return (
    <div className="flex gap-10">
      <Users className="h-[50vh] w-48 p-5 border border-gray-300 flex flex-col" />
      <div className="flex-1">
        <PageNav segment="medias" />
        <h1 className="text-2xl font-bold py-4">Medias</h1>
        <Medias />
      </div>
    </div>
  )
}
