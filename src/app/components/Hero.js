"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  // Init AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,      // animate only once
      offset: 60,
    });
  }, []);

  // Automatically change background image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center text-center text-gray-800 overflow-hidden transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
        backgroundAttachment: "scroll",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-blue-50/70 to-white/90 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-4 sm:px-6">
        {/* Logo */}
        <div
          className="mb-6 sm:mb-8 drop-shadow-xl"
          data-aos="fade-down"
          data-aos-delay="0"
        >
          <img
            src="/Logo SCOC.png"
            alt="OCSC logo"
            className="rounded-xl mx-auto w-44 h-28 sm:w-80 sm:h-24 object-contain hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-serif tracking-tight text-blue-900 leading-snug sm:leading-tight drop-shadow-sm"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          OpenArc Campus <br className="hidden sm:block" />
          <span className="text-blue-500 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Student Council
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="max-w-md sm:max-w-2xl mx-auto mt-5 sm:mt-7 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          The heart of student leadership at OpenArc — uniting passionate
          innovators, collaborators, and creators to grow together through
          learning and shared vision.
        </p>

        {/* Buttons */}
        <div
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          <a
            href="#about"
            className="px-7 py-3 sm:px-8 sm:py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-lg 
                       hover:bg-blue-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="px-7 py-3 sm:px-8 sm:py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg 
                       hover:bg-blue-50 hover:text-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}