import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const admin = getAdminUser(cookieStore);

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome, {admin.email}</p>

      <form action="/api/admin/logout" method="POST">
        <button className="mt-6 rounded bg-red-600 px-4 py-2 text-white">
          Logout
        </button>
      </form>
    </main>
  );
}
