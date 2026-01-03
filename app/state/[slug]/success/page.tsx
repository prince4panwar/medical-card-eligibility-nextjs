export const metadata = {
  title: "Success - Medical Card App",
  description: "Successful application confirmation",
};

export default async function SuccessPage({
  searchParams,
  params,
}: {
  searchParams: { name: string };
  params: { slug: string };
}) {
  const { name } = await searchParams;
  const { slug } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <span className="text-xl text-green-600">✓</span>
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          Thank you, {name}!
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          You have successfully applied for the{" "}
          <span className="font-medium capitalize">{slug}</span> program.
        </p>

        <a
          href={`/state/${slug}`}
          className="mt-6 inline-block rounded-md bg-blue-600 px-5 py-2 text-sm font-medium
                     text-white transition hover:bg-blue-700 focus:outline-none
                     focus:ring-2 focus:ring-blue-500"
        >
          Back to State Page
        </a>
      </div>
    </main>
  );
}
