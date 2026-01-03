"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import states from "@/data/states.json";

export type FormValues = {
  name: string;
  email: string;
  age: number;
  condition: string;
  agree: boolean;
};

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const state = states.find((s) => s.slug === slug);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

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
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Age"
            {...register("age", {
              required: "Age is required",
              min: {
                value: state?.age || 1,
                message: `You must be at least ${state?.age}`,
              },
            })}
          />
          {errors.age && (
            <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>
          )}
        </div>

        <textarea
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Medical Condition"
          rows={3}
          {...register("condition")}
        />

        <div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              {...register("agree", {
                required: "You must agree to continue",
              })}
            />
            <span>I agree to the privacy policy</span>
          </label>

          {errors.agree && (
            <p className="mt-1 text-xs text-red-500">{errors.agree.message}</p>
          )}
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
