"use client";

import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiTag,
  FiFilter,
  FiCheckCircle,
} from "react-icons/fi";

// Replace with your actual Google Form URL
const GOOGLE_FORM_URL = "https://forms.gle/YOUR_FORM_ID";

function toGCalDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  const YYYY = d.getUTCFullYear();
  const MM = pad(d.getUTCMonth() + 1);
  const DD = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mm = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());
  return `${YYYY}${MM}${DD}T${hh}${mm}${ss}Z`;
}

function googleCalendarLink(e) {
  const text = encodeURIComponent(e.title);
  const dates = `${toGCalDate(e.start)}/${toGCalDate(e.end || e.start)}`;
  const details = encodeURIComponent(e.description || "");
  const location = encodeURIComponent(e.location || "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

function formatDateRange(startISO, endISO) {
  const s = new Date(startISO);
  const e = new Date(endISO || startISO);

  const dateFmt = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const sameDay =
    s.getFullYear() === e.getFullYear() &&
    s.getMonth() === e.getMonth() &&
    s.getDate() === e.getDate();

  if (sameDay) {
    return `${dateFmt.format(s)} • ${timeFmt.format(s)}–${timeFmt.format(e)}`;
  }
  return `${dateFmt.format(s)} ${timeFmt.format(s)} → ${dateFmt.format(
    e
  )} ${timeFmt.format(e)}`;
}

function EventCard({ event, delay = 0 }) {
  const { title, start, end, location, category, image, description, rsvpLink } =
    event;

  const dateBadge = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(start));

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="relative mb-4">
        <div className="h-40 w-full rounded-xl overflow-hidden ring-4 ring-blue-50 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={`${title} cover`}
              className="h-full w-full object-cover"
              loading="lazy"
              onLoad={() => AOS.refresh()}
            />
          ) : (
            <span className="text-blue-700 font-bold">{category}</span>
          )}
        </div>

        <span className="absolute top-3 left-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-white/90 text-gray-800 border border-gray-200">
          <FiTag className="mr-1 h-3.5 w-3.5" />
          {category}
        </span>

        <span className="absolute top-3 right-3 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-blue-700 text-white">
          {dateBadge}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiCalendar className="h-4 w-4 text-blue-700" />
          <span>{formatDateRange(start, end)}</span>
        </div>
        {location && (
          <div className="flex items-center gap-2">
            <FiMapPin className="h-4 w-4 text-blue-700" />
            <span>{location}</span>
          </div>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">{description}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={rsvpLink || GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md shadow-sm hover:bg-blue-800 transition-colors"
          aria-label="RSVP for this event"
        >
          <FiCheckCircle className="h-4 w-4" />
          RSVP
        </a>
        <a
          href={googleCalendarLink(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
          aria-label="Add to Google Calendar"
        >
          <FiCalendar className="h-4 w-4" />
          Add to Calendar
        </a>
      </div>
    </div>
  );
}

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

export default function EventsPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const headerBgUrl = "https://www.tysers.com/wp-content/uploads/2020/04/music-slider-bg-2560x900-c-center.jpg";

  // Sample data — replace with your events
  const events = [
    {
      id: "SOLUNA’25-2025-12-10",
      title: "SOLUNA’25 – The Cultural Night!",
      start: "2025-12-10T05:30:00+05:30",
      end: "2025-12-10T11:00:00+05:30",
      location: "OpenArc Campus, Colombo, Sri Lanka",
      category: "Social",
      image: "/events/WhatsApp Image 2025-10-17 at 11.25.25_7c0acc6f.jpg",
      description:
        "Experience the vibrant cultures of Sri Lanka through dance, music, and cuisine at SOLUNA’25. A night to remember!",
      rsvpLink: GOOGLE_FORM_URL,
    },

  ];

  const now = new Date();

  const upcoming = useMemo(
    () =>
      [...events]
        .filter((e) => new Date(e.end || e.start) >= now)
        .sort((a, b) => +new Date(a.start) - +new Date(b.start)),
    [events]
  );

  const past = useMemo(
    () =>
      [...events]
        .filter((e) => new Date(e.end || e.start) < now)
        .sort((a, b) => +new Date(b.start) - +new Date(a.start)),
    [events]
  );

  const baseCategories = useMemo(
    () => Array.from(new Set(events.map((e) => e.category))).sort(),
    [events]
  );
  const categories = ["All", ...baseCategories];

  const [activeCat, setActiveCat] = useState("All");

  const countByCategory = (list) =>
    list.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1;
      return acc;
    }, {});

  const upcomingCounts = countByCategory(upcoming);
  const counts = {
    All: upcoming.length,
    ...upcomingCounts,
  };

  const filterByCat = (list) =>
    list.filter((e) => activeCat === "All" || e.category === activeCat);

  const upcomingFiltered = filterByCat(upcoming);
  const pastFiltered = filterByCat(past);

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
            Events
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Join upcoming hikes, socials, and volunteering days. RSVP and add to
            your calendar in one click.
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

        {/* Upcoming */}
        <div className="mt-10">
          <SectionHeader title="Upcoming events" Icon={FiCalendar} />
          {upcomingFiltered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upcomingFiltered.map((e, idx) => (
                <EventCard key={e.id} event={e} delay={150 + idx * 100} />
              ))}
            </div>
          ) : (
            <div
              className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <p className="text-gray-700">
                No upcoming events in this category right now.
              </p>
              <div className="mt-4">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
                >
                  <FiCheckCircle className="h-4 w-4" />
                  Get notified / RSVP
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Past */}
        <div className="mt-14">
          <SectionHeader title="Past highlights" Icon={FiClock} />
          {pastFiltered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pastFiltered.map((e, idx) => (
                <EventCard key={e.id} event={e} delay={150 + idx * 80} />
              ))}
            </div>
          ) : (
            <div
              className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-700"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              Nothing here yet—check back soon!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}