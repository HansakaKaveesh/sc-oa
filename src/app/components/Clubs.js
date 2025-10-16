"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Clubs() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const clubs = [
    { name: "Media Club", image: "https://images.seeklogo.com/logo-png/18/1/logo-com-hr-logo-png_seeklogo-186226.png" },
    { name: "English Club", image: "https://images.seeklogo.com/logo-png/18/1/logo-com-hr-logo-png_seeklogo-186226.png" },
    { name: "Social & Adventure Club", image: "https://images.seeklogo.com/logo-png/18/1/logo-com-hr-logo-png_seeklogo-186226.png" },
  ];

  const baseDelay = 150;
  const step = 120;
  const dividerDelay = baseDelay + clubs.length * step;

  return (
    <section
      id="clubs"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* ---- Title ---- */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          Our <span className="text-blue-800">Clubs&nbsp;&amp;&nbsp;Societies</span>
        </h2>
        <p
          className="max-w-2xl mx-auto text-gray-600 mb-10 sm:mb-12 text-base sm:text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          OCSC unites all student‑driven communities under one umbrella — connecting passionate learners,
          innovators, and creators across every field in computing.
        </p>

        {/* ---- Club Cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {clubs.map((c, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden
                         transition-all duration-500 hover:-translate-y-2 border border-transparent 
                         hover:border-orange-300 cursor-pointer flex flex-col w-full max-w-sm h-64 sm:h-72"
              data-aos="fade-up"
              data-aos-delay={baseDelay + i * step}
            >
              {/* Image */}
              <div className="h-40 sm:h-44 w-full overflow-hidden flex-shrink-0">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onLoad={() => AOS.refresh()}
                />
              </div>

              {/* Name */}
              <div className="flex-grow flex flex-col justify-center items-center p-4 sm:p-5">
                <h3 className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-orange-600 transition-colors text-center">
                  {c.name}
                </h3>
              </div>

              {/* Accent border ring */}
              <span className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-orange-400 transition-all duration-500"></span>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div
          className="mt-12 sm:mt-16 flex justify-center"
          data-aos="fade-up"
          data-aos-delay={dividerDelay}
        >
          <span className="inline-block w-20 sm:w-24 h-1 rounded-full bg-blue-800"></span>
        </div>
      </div>
    </section>
  );
}