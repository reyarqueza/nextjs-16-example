// File: app/page.tsx

import PageNav from "@/app/page-nav";
import { Suspense } from 'react';
import UsersCollection from '@/app/components/users-collection';

export default async function Home() {
  return (
  <>
    <PageNav segment="" />
    <h1 className="text-2xl font-bold py-4">Home</h1>
    <Suspense fallback={<div>Loading...</div>}>
      <UsersCollection />
    </Suspense>
  </>
  );
}
