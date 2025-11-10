import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components';
import Link from 'next/link';

import '../global.css';
import { withAuth } from '@workos-inc/authkit-nextjs';

export const metadata = {
  title: 'Welcome to NRLA',
};

export default async function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <html lang="en">
          <body>
            <AuthKitProvider>

    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-gray-200">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
          <Link href="/" className="font-bold tracking-wide text-blue-400">NRLA</Link>
          <nav className="flex gap-3.5">
            <Link
              href="/"
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
            >
              About
            </Link>
            {user ? (
              <Link
              href="/dashboard"
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
            >
              Dashboard
            </Link>
            ) : (
            <Link
              href="/login"
              className="text-gray-200 text-sm px-2.5 py-2 rounded-lg transition-colors hover:bg-blue-400/10 hover:text-blue-200"
            >
              Login
            </Link>)}
          </nav>
        </div>
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

        </AuthKitProvider>
            </body>
        </html>
  );
}

