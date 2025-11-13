import { signOut, withAuth } from '@workos-inc/authkit-nextjs';
import Link from 'next/link';

import '../global.css';

export const metadata = {
  title: 'NRLA Dashboard',
};

export default async function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-gray-200">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <form
          className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4"
          action={async () => {
            'use server';
            await signOut({
              returnTo: process.env.NEXT_PUBLIC_WORKOS_RETURN_TO,
            });
          }}
        >
          <Link href="/" className="font-bold tracking-wide text-blue-400">
            NRLA
          </Link>
          <nav className="flex gap-3.5">
            <Link
              href="/dashboard"
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
            >
              Dashboard
            </Link>
            <Link
              href="/account"
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
            >
              {user.firstName && `${user.firstName} ${user.lastName}`}
            </Link>
            <button
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
              type="submit"
            >
              Sign out
            </button>
          </nav>
        </form>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-7">
        {children}
      </main>
      <footer className="border-t border-slate-700 bg-slate-800">
        <div className="max-w-6xl mx-auto px-5 py-4 text-gray-400 text-xs">
          <span>© {new Date().getFullYear()} NRLA</span>
        </div>
      </footer>
    </div>
  );
}
