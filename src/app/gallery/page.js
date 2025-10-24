"use client";

import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FiFilter,
  FiTag,
  FiMapPin,
  FiCalendar,
  FiCamera,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiZoomIn,
} from "react-icons/fi";

// Sample photos — replace with your own
const photos = [
  {
    id: "Awrudu event",
    src: "/hero1.jpg",
    alt: "Awrudu celebration",
    category: "Cultural",
    location: "Colombo, Sri Lanka",
    date: "2025-11-12",
    albumUrl: "https://photos.app.goo.gl/YOUR_ALBUM",
  },
  {
    id: "Trip to Ambuluwawa",
    src: "/hero2.jpg",
    alt: "Volunteers collecting plastic on the beach",
    category: "Volunteering",
    location: "Mount Lavinia Beach",
    date: "2025-11-23",
    albumUrl: "https://photos.app.goo.gl/YOUR_ALBUM",
  },
  {
    id: "social-01",
    src: "/gallery/game-night-01.jpg",
    alt: "Board game night crowd laughing",
    category: "Social",
    location: "Innovation Hub, Colombo",
    date: "2025-10-25",
  },
  {
    id: "workshop-01",
    src: "/gallery/first-aid-01.jpg",
    alt: "First aid demo with CPR practice",
    category: "Workshop",
    location: "Community Center, Dehiwala",
    date: "2025-11-05",
  },
  {
    id: "hike-02",
    src: "/gallery/hike-02.jpg",
    alt: "Group photo at a waterfall",
    category: "Hiking",
    location: "Knuckles Range",
    date: "2025-08-10",
  },
  {
    id: "social-02",
    src: "/gallery/social-02.jpg",
    alt: "Coffee meet and greet",
    category: "Social",
    location: "Colombo",
    date: "2025-07-18",
  },
  {
    id: "vol-02",
    src: "/gallery/volunteer-02.jpg",
    alt: "Sorting collected waste into bags",
    category: "Volunteering",
    location: "Galle Face Green",
    date: "2025-05-30",
  },
  {
    id: "hike-03",
    src: "/gallery/hike-03.jpg",
    alt: "Trail through misty pines",
    category: "Hiking",
    location: "Nuwara Eliya",
    date: "2025-06-02",
  },
];

// Helper components
function SectionHeader({ title, Icon }) {
  return (
    <div
      className="flex items-center justify-center gap-3 mb-6"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

function CategoryFilter({ categories, active, counts, onChange }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 justify-center"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <span className="inline-flex items-center gap-2 text-gray-600 text-sm mr-1">
        <FiFilter className="h-4 w-4" /> Filter
      </span>
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={[
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors",
              isActive
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-800",
            ].join(" ")}
            aria-pressed={isActive}
          >
            <span>{cat}</span>
            <span
              className={[
                "inline-flex items-center justify-center text-xs rounded-full px-1.5 py-0.5",
                isActive ? "bg-white/20" : "bg-gray-100 text-gray-600",
              ].join(" ")}
            >
              {counts[cat] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// UPDATED: no fixed aspect ratio — let images define height
function GalleryCard({ photo, delay = 0, onOpen }) {
  const { src, alt, category, location, date } = photo;
  const monthDay = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(date));

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full rounded-2xl overflow-hidden border border-gray-100 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      data-aos="fade-up"
      data-aos-delay={delay}
      aria-label={`Open photo: ${alt}`}
    >
      {/* Natural-height image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover block"
        loading="lazy"
        onLoad={() => AOS.refresh()}
      />

      {/* Top badges */}
      <div className="absolute top-3 left-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-white/90 text-gray-800 border border-gray-200">
        <FiTag className="mr-1 h-3.5 w-3.5" />
        {category}
      </div>
      <div className="absolute top-3 right-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-blue-700 text-white">
        {monthDay}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="space-y-0.5 text-left">
          {location && (
            <p className="text-xs flex items-center gap-1.5">
              <FiMapPin className="h-4 w-4" />
              {location}
            </p>
          )}
          <p className="text-xs flex items-center gap-1.5">
            <FiCalendar className="h-4 w-4" />
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md text-xs">
          <FiZoomIn className="h-4 w-4" /> View
        </span>
      </div>
    </button>
  );
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  if (index < 0 || index >= items.length) return null;
  const p = items[index];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/90 hover:text-white inline-flex items-center gap-2"
          aria-label="Close lightbox"
        >
          <FiX className="h-6 w-6" />
        </button>

        <div className="relative bg-black/30 rounded-xl overflow-hidden">
          <img
            src={p.src}
            alt={p.alt || "Photo"}
            className="w-full max-h-[75vh] object-contain bg-black/20"
            loading="eager"
          />

          {/* Navigation */}
          {items.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
                aria-label="Previous photo"
              >
                <FiChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
                aria-label="Next photo"
              >
                <FiChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption / Meta */}
        <div className="mt-3 text-white/90 text-sm flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <FiCamera className="h-4 w-4" />
            {p.alt}
          </span>
          {p.location && (
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin className="h-4 w-4" />
              {p.location}
            </span>
          )}
          {p.date && (
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar className="h-4 w-4" />
              {new Date(p.date).toLocaleDateString()}
            </span>
          )}
          {p.albumUrl && (
            <a
              href={p.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-white/40 hover:decoration-white"
            >
              <FiExternalLink className="h-4 w-4" />
              Open album
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const headerBgUrl =
    "https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg";

  const baseCategories = useMemo(
    () => Array.from(new Set(photos.map((p) => p.category))).sort(),
    []
  );
  const categories = ["All", ...baseCategories];

  const [activeCat, setActiveCat] = useState("All");

  const filtered = useMemo(
    () =>
      photos.filter((p) => activeCat === "All" || p.category === activeCat),
    [activeCat]
  );

  const counts = useMemo(() => {
    const map = photos.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
    return { All: photos.length, ...map };
  }, []);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(-1);
  const prev = () =>
    setLightboxIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  const next = () =>
    setLightboxIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    // Prevent background scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = origOverflow;
    };
  }, [lightboxIndex, filtered.length]);

  return (
    <main className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero */}
      <section
        className="relative py-14 sm:py-18 md:py-28 text-center bg-cover bg-center bg-scroll md:bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('${headerBgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-50/70 to-white/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-18">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            Gallery
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Moments from hikes, socials, and volunteering—captured by our
            community.
          </p>
          <div
            className="mt-6 flex justify-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="inline-block w-24 h-1 rounded-full bg-blue-700" />
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 mt-10">
        {/* Filter */}
        <CategoryFilter
          categories={categories}
          active={activeCat}
          counts={counts}
          onChange={setActiveCat}
        />

        {/* Masonry Grid: 4 columns on large screens */}
        <div className="mt-10">
          <SectionHeader title="All photos" Icon={FiCamera} />
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
              {filtered.map((p, idx) => (
                <div
                  key={p.id}
                  className="mb-4 break-inside-avoid inline-block w-full"
                  style={{ breakInside: "avoid" }}
                >
                  <GalleryCard
                    photo={p}
                    delay={150 + idx * 80}
                    onOpen={() => openAt(idx)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-700"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Nothing in this category yet—check back soon!
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </main>
  );
}