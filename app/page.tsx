import StateSelector from "@/components/StateSelector";

export const metadata = {
  title: "Medical Card Eligibility",
  description: "Check your medical card eligibility by state",
};

export default function HomePage() {
  return (
    <main>
      <h1>Check Medical Card Eligibility</h1>
      <StateSelector />
    </main>
  );
}
