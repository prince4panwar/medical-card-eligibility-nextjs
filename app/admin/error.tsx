"use client";

import ErrorMessage from "@/components/ErrorMessage";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <ErrorMessage title="Something went wrong" message={error.message} />
    </main>
  );
}
