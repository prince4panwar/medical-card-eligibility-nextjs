import StateSelector from "@/components/StateSelector";

export const metadata = {
  title: "Medical Card Eligibility",
  description: "Check your medical card eligibility by state",
};

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-8 shadow-sm text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Check Medical Card Eligibility
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Select your state to see eligibility requirements and start your
          application.
        </p>

        <div className="mt-6">
          <StateSelector />
        </div>
      </div>
    </main>
  );
}
