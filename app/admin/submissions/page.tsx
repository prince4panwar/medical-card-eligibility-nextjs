import fs from "fs/promises";
import path from "path";

type Submission = {
  name: string;
  email: string;
  age: number;
  state: string;
  date: string;
};

export const metadata = {
  title: "Admin - Submissions",
  description: "Admin view of all submissions",
};

export default async function AdminSubmissionsPage() {
  const filePath = path.join(process.cwd(), "data/submissions.json");
  const submissions: Submission[] = JSON.parse(
    await fs.readFile(filePath, "utf-8")
  );

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Submissions ({submissions.length})
      </h1>

      {submissions.length === 0 ? (
        <p className="text-gray-600">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Age</th>
                <th className="px-4 py-3 font-medium">State</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {submissions.map((s, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{s.age}</td>
                  <td className="px-4 py-3 capitalize">{s.state}</td>
                  <td className="px-4 py-3 capitalize">
                    {new Date(s.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
