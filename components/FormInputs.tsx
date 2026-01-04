"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import states from "@/data/states.json";
import ErrorMessage from "./FormInputError";

export type FormValues = {
  name: string;
  email: string;
  age: number;
  condition: string;
  agree: boolean;
};

export default function FormInputs() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const state = states.find((s) => s.slug === slug);

  const formSchema = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .nonempty("Email must be required")
      .email("Enter a valid email"),
    age: z.number("Age is required").min(state?.age ?? 1, {
      message: `You must be at least ${state?.age}`,
    }),
    condition: z.string().optional(),
    agree: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy policy",
    }),
  });
  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormValues) {
    const res = await fetch("/api/eligibility", {
      method: "POST",
      body: JSON.stringify({ ...data, state: slug }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push(`/state/${slug}/success?name=${data.name}`);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-gray-900">
          Start Your Evaluation
        </h1>

        <div>
          <input
            placeholder="Full Name"
            {...register("name")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage message={errors.name?.message} />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage message={errors.email?.message} />
        </div>

        <div>
          <input
            type="number"
            placeholder="Age"
            {...register("age", { valueAsNumber: true })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage message={errors.age?.message} />
        </div>

        <textarea
          rows={3}
          placeholder="Medical Condition"
          {...register("condition")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              {...register("agree")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            I agree to the privacy policy
          </label>
          <ErrorMessage message={errors.agree?.message} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium
                     text-white transition hover:bg-blue-700 disabled:opacity-60
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </main>
  );
}
