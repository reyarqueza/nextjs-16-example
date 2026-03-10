'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname(); // Get the current path

  return (
    <header>
      <nav className="flex gap-4 p-4 mb-4">
        <Link
          href="/"
          className={`text-xl ${pathname === '/' ? 'text-blue-500 hover:text-blue-700 font-bold' : 'text-gray-500'}`}
        >
          Home
        </Link> |
        <Link
          href="/manage"
          className={`text-xl ${pathname === '/manage' ? 'text-blue-500 hover:text-blue-700 font-bold' : 'text-gray-500'}`}
        >
          Manage
        </Link>
      </nav>
    </header>
  );
}
