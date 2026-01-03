"use client";

import { useRouter } from "next/navigation";
import states from "@/data/states.json";
import { useState } from "react";

export default function StateSelector() {
  const [state, setState] = useState("");
  const router = useRouter();

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.name}
          </option>
        ))}
      </select>

      <button
        disabled={!state}
        onClick={() => router.push(`/state/${state}`)}
        className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white
                   transition hover:bg-blue-700
                   disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Check Eligibility
      </button>
    </div>
  );
}
