// File: app/page.tsx

import PageNav from "@/app/page-nav";
import { Suspense } from 'react';
import UsersCollection from '@/app/components/users-collection';
import Users from "@/app/components/users";

export default async function Home() {
  return (
    <div className="flex gap-10">
      <Users className="h-[50vh] w-48 p-5 border border-gray-200 flex flex-col" />
      <div className="flex-1">
        <PageNav segment="" />
        <h1 className="text-2xl font-bold py-4">Home</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersCollection />
        </Suspense>
      </div>
    </div>
  );
}
