import PageNav from "@/app/page-nav";
import Medias from '@/app/components/medias';

export default async function Page() {
  return (
    <>
      <PageNav segment="medias" />
      <h1 className="text-2xl font-bold py-4">Medias</h1>
      <Medias />
    </>
  )
}
