"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowDown, FiUsers } from "react-icons/fi";

// Replace with your real logo paths (note: spaces in filenames should be URL-encoded or renamed)
const CAMPUS_LOGO = { src: "/Logo%20SCOC.png", alt: "OpenArc Campus Committee" };

const CLUB_LOGOS = [
  { image: "https://images.seeklogo.com/logo-png/18/1/logo-com-hr-logo-png_seeklogo-186226.png", alt: "Media Club" },
  { image: "https://images.seeklogo.com/logo-png/18/1/logo-com-hr-logo-png_seeklogo-186226.png", alt: "Social & Adventure Club" },
  { image: "https://images.seeklogo.com/logo-png/18/1/logo-com-hr-logo-png_seeklogo-186226.png", alt: "English Club" },
];

function HierarchyFlow({ campus, clubs }) {
  // Normalize and assign unique ids to avoid duplicate React keys
  const normalized = (clubs || []).slice(0, 3).map((c, i) => ({
    id: c.id ?? `club-${i}`,           // unique key
    src: c.src || c.image || "",       // support both src or image
    alt: c.alt || `Club ${i + 1}`,
  }));

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Top: Committee */}
      <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay="60">
        <div className="grid place-items-center rounded-full bg-white/95 ring-4 ring-blue-50 shadow-md overflow-hidden w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={campus.src}
            alt={campus.alt}
            className="w-full h-full object-contain p-2"
            loading="lazy"
            onLoad={() => AOS.refresh()}
            draggable={false}
          />
        </div>
        <p className="mt-2 text-sm font-semibold text-gray-800">Committee</p>
      </div>

      {/* Connector down */}
      <div className="flex flex-col items-center my-3" data-aos="fade-up" data-aos-delay="120">
        <div className="h-8 w-[2px] rounded-full bg-gradient-to-b from-blue-300 to-blue-600" />
        <FiArrowDown className="text-blue-700 mt-1" />
      </div>

      {/* Middle: Clubs row */}
      <div className="flex items-start justify-center gap-6 sm:gap-10" data-aos="zoom-in" data-aos-delay="160">
        {normalized.map((club) => (
          <div key={club.id} className="flex flex-col items-center">
            <div className="grid place-items-center rounded-full bg-white/95 ring-4 ring-blue-50 shadow-md overflow-hidden w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform duration-300 hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={club.src}
                alt={club.alt}
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
                onLoad={() => AOS.refresh()}
                draggable={false}
              />
            </div>
            <p className="mt-2 text-xs text-gray-700 text-center max-w-[8rem]">{club.alt}</p>

            {/* Per-club connector to students */}
            <div className="mt-3 h-8 w-[2px] rounded-full bg-gradient-to-b from-blue-300 to-blue-600" />
            <FiArrowDown className="text-blue-700 mt-1" />
          </div>
        ))}
      </div>

      {/* Bottom: Students band */}
      <div className="mt-5 sm:mt-6 flex flex-col items-center" data-aos="fade-up" data-aos-delay="220">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-800 shadow-sm">
          <FiUsers className="text-blue-700" />
          <span className="font-semibold">Students</span>
        </div>
        <div className="mt-3 flex -space-x-2">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-200 to-blue-50 ring-2 ring-white" />
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-50 ring-2 ring-white" />
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-50 ring-2 ring-white" />
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-200 to-purple-50 ring-2 ring-white" />
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-200 to-amber-50 ring-2 ring-white" />
        </div>
      </div>
    </div>
  );
}

export default function Specializations() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  return (
    <section id="clubs" className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6" data-aos="fade-up">
          Campus & Clubs — Flow of Responsibility
        </h2>

        <HierarchyFlow campus={CAMPUS_LOGO} clubs={CLUB_LOGOS} />
      </div>
    </section>
  );
}