import states from "@/data/states.json";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

export function generateStaticParams() {
  return states.map((state) => ({
    slug: state.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const state = states.find((s) => s.slug === slug);

  if (!state) {
    return {
      title: "State Not Found",
      description: "The requested state page does not exist.",
    };
  }

  const title = `${state.name} Medical Card | Eligibility, Fees & Age`;
  const description = `Check ${state.name} medical card eligibility, minimum age requirement (${state.age}), card fee ($${state.fee}), and apply online easily.`;

  return {
    title,
    description,
  };
}

export default async function StatePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const state = states.find((s) => s.slug === slug);

  if (!state) {
    notFound();
  }

  return (
    <main className="mx-auto mt-10 max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">
        {state?.name}
      </h1>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-900">Minimum Age:</span>{" "}
          {state?.age}
        </p>

        <p>
          <span className="font-medium text-gray-900">Card Fee:</span> $
          {state?.fee}
        </p>

        <p className="pt-2 text-gray-600">{state?.description}</p>
      </div>

      <a href={`/state/${state?.slug}/apply`} className="mt-6 inline-block">
        <button
          className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white
                 transition hover:bg-blue-700 focus:outline-none focus:ring-2
                 focus:ring-blue-500"
        >
          Start Evaluation
        </button>
      </a>
    </main>
  );
}
