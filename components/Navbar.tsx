import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-blue-600 hover:text-blue-700"
        >
          MedCard
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/admin/submissions" className="hover:text-blue-600">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
