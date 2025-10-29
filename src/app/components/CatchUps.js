"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CatchUps() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const updates = [
    {
      title: "SOLUNA’25 – The Cultural Night!",
      text: "Experience the vibrant cultures of Sri Lanka through dance, music, and cuisine at SOLUNA’25. A night to remember!",
      img: "/events/WhatsApp Image 2025-10-17 at 11.25.25_7c0acc6f.jpg",
      link: "#",
      tag: "Social Event",
    },
    {
      title: "OFFICIAL WRISTBAND!",
      text: "Get your exclusive OpenArc Campus wristband now! Show your pride and support for our vibrant campus community.",
      img: "/18899268.png",
      link: "#",
      tag: "Merch Drop",
    },
    {
      title: "Malaysia Study Tour 2026",
      text: "Join us for an unforgettable study tour to Malaysia in 2026! Explore top universities, experience the culture, and broaden your horizons.",
      img: "/malashiya.jpg",
      link: "#",
      tag: "Event Highlights",
    },
  ];

  const baseDelay = 150;
  const step = 120;
  const dividerDelay = baseDelay + updates.length * step;

  return (
    <section
      id="catchups"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            Catch <span className="text-blue-800">Ups</span>
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Stay in the loop with our latest updates, events, and announcements
            happening across the OpenArc Campus.
          </p>
        </div>

        {/* Grid of updates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {updates.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col"
              data-aos="fade-up"
              data-aos-delay={baseDelay + idx * step}
            >
              {/* Image */}
              <div className="overflow-hidden h-44 sm:h-52 md:h-56 flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onLoad={() => AOS.refresh()}
                />
              </div>

              {/* Tag badge */}
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-600 text-white text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                {item.tag}
              </span>

              {/* Text content */}
              <div className="p-4 sm:p-5 text-left flex flex-col flex-grow">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 group-hover:text-orange-600 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.text}
                </p>
              </div>
            </a>
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