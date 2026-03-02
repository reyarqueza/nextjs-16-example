import Link from "next/link";

export default function PageNav({segment}: {segment: string}) {
  return (
    <nav className="flex justify-center gap-4 py-4">
      <Link href="/" className={segment === "" ? "text-blue-500" : ""}>Home</Link> |&nbsp;
      <Link href="/medias" className={segment === "medias" ? "text-blue-500" : ""}>Medias</Link> |&nbsp;
      <Link href="/users" className={segment === "users" ? "text-blue-500" : ""}>Users</Link>
    </nav>
  );
}
