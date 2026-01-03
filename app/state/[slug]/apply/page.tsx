import FormInputs from "@/components/FormInputs";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function ApplyPage() {
  return (
    <Suspense
      fallback={<Loading fullScreen size="lg" text="Loading form..." />}
    >
      <FormInputs />
    </Suspense>
  );
}
