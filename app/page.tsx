// File: app/page.tsx

import PageNav from "@/app/page-nav";
import { Suspense } from 'react';
import AllUsersCollection from '@/app/components/all-users-collection';

export default async function Home() {
  return (
  <>
    <PageNav segment="" />
    <h1 className="text-2xl font-bold py-4">Home</h1>
    <Suspense fallback={<div>Loading...</div>}>
      <AllUsersCollection />
    </Suspense>
  </>
  );
}
