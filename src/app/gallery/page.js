"use client";

import { FiTool, FiClock, FiHome, FiMail } from "react-icons/fi";

export default function UnderDevelopmentPage() {
  const expected = "Coming soon"; // e.g., "Launching Nov 2025"

  return (
    <main className="relative min-h-[80vh] bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-50 text-blue-700 shadow-sm mb-5">
          <FiTool className="h-7 w-7" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          This page is under development
        </h1>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We’re building this page. Expect it soon. {expected}.
        </p>

        {/* Soft progress indicator */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-pulse rounded-full w-2/3"></div>
          </div>
          <div className="mt-2 text-xs text-gray-500 inline-flex items-center gap-2 justify-center w-full">
            <FiClock className="h-4 w-4 text-gray-400" />
            Working on it…
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white hover:bg-blue-800 shadow-sm"
          >
            <FiHome className="h-4 w-4" />
            Back to Home
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
          >
            <FiMail className="h-4 w-4" />
            Contact us
          </a>
        </div>

        {/* Optional notes */}
        <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white/80 backdrop-blur p-5 text-left">
          <h2 className="font-semibold text-gray-900">What to expect</h2>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Fresh content and a smoother experience</li>
            <li>Mobile‑friendly design</li>
            <li>Regular updates as we roll out features</li>
          </ul>
        </div>
      </section>
    </main>
  );
}