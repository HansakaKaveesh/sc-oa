"use client";

import { useEffect, useState, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const images = useMemo(() => ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"], []);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  // AOS
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
  }, []);

  // Prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const i = new Image();
      i.src = src;
    });
  }, [images]);

  // Slideshow
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setPrev((p) => current);
      setCurrent((c) => (c + 1) % images.length);
    }, 4500);
    return () => clearInterval(id);
  }, [current, images.length, reduceMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center text-gray-800 overflow-hidden"
    >
      {/* Background slideshow layers */}
      <div className="absolute inset-0">
        {images.map((src, i) => {
          const isActive = i === current;
          const isPrev = i === prev;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={[
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out will-change-transform",
                isActive ? "opacity-100" : "opacity-0",
                // Ken Burns on the active slide (skips if reduced motion)
                isActive && !reduceMotion ? "animate-[kb_9s_ease-out_forwards]" : "",
                // Keep previous frame briefly for smoother crossfade
                isPrev && !reduceMotion ? "scale-100" : "",
              ].join(" ")}
              loading={i === 0 ? "eager" : "lazy"}
            />
          );
        })}
      </div>

      {/* Overlays: gradient + aurora + noise */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-blue-60/40 to-white/80 backdrop-blur-[2px]" />
      
      <div
        className="absolute inset-0 opacity-[.18] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')",
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-4 sm:px-6">
        {/* Logo */}
        <div className="mb-4 mt-10 drop-shadow-xl" data-aos="fade-down" data-aos-delay="0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Logo SCOC.png"
            alt="OCSC logo"
            className="mx-auto h-36 w-64 sm:h-36 sm:w-84 rounded-xl object-contain hover:scale-105 transition-transform duration-700 ease-out"
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
          The heart of student leadership at OpenArc - uniting passionate
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
            className="relative inline-flex items-center justify-center px-7 py-3 sm:px-8 sm:py-2 font-semibold rounded-lg shadow-lg 
                       bg-blue-700 text-white hover:bg-blue-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            <span className="absolute -z-10 inset-0 rounded-lg blur-lg bg-blue-500/40 opacity-0 group-hover:opacity-100 transition" />
            Learn More
          </a>
          <a
            href="/contact"
            className="relative inline-flex items-center justify-center px-7 py-3 sm:px-8 sm:py-2 font-semibold rounded-lg 
                       border-2 border-blue-700 text-blue-700 hover:bg-blue-50 hover:text-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            Get in Touch
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-10 sm:mt-12 flex justify-center" data-aos="fade-up" data-aos-delay="350">
          <div className="flex items-center gap-2 text-blue-700/80 text-sm">
            <span>Scroll</span>
            <svg
              className="h-5 w-5 animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes kb {
          0% { transform: scale(1.05) translateY(0); }
          100% { transform: scale(1.12) translateY(6px); }
        }
        @keyframes drift {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(-18px,12px,0) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[kb_9s_ease-out_forwards] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}