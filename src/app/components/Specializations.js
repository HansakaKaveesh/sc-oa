"use client";

import { useEffect } from "react";
import { FiBarChart2, FiCode, FiShield, FiServer, FiMonitor, FiCpu } from 'react-icons/fi';
import AOS from "aos";
import "aos/dist/aos.css";

export default function Specializations() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const specs = [
    { title: 'Data Science', icon: FiBarChart2 },
    { title: 'Software Engineering', icon: FiCode },
    { title: 'Cyber Security', icon: FiShield },
    { title: 'Information Systems', icon: FiServer },
    { title: 'Interactive Media', icon: FiMonitor },
    { title: 'Information Technology', icon: FiCpu },
  ];

  const dividerDelay = 150 + specs.length * 80;

  return (
    <section
      id="specializations"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* ---- Title ---- */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          Our <span className="text-blue-800">Specializations</span>
        </h2>
        <p
          className="max-w-2xl mx-auto text-gray-600 mb-10 sm:mb-12 text-base sm:text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          The OpenArc Campus offers diverse fields of study that nurture expertise
          from software building to cybersecurity leadership.
        </p>

        {/* ---- Specialization bubbles ---- */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {specs.map(({ title, icon: Icon }, i) => (
            <li
              key={title}
              className="group relative bg-white shadow-md hover:shadow-lg border border-orange-100
                         rounded-full px-5 sm:px-8 py-3 sm:py-5 text-xs sm:text-sm md:text-base font-semibold text-gray-700
                         transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-r
                         from-orange-500/10 via-orange-50 to-orange-500/10 backdrop-blur-sm"
              data-aos="zoom-in"
              data-aos-delay={150 + i * 80}
            >
              {/* Decorative ring */}
              <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-orange-400 transition-all duration-500"></span>

              {/* Icon + label */}
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                <Icon
                  className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                />
                {title}
              </span>
            </li>
          ))}
        </ul>

        {/* ---- Decorative divider ---- */}
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