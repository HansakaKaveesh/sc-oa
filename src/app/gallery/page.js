"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
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

// Max photos to render per category
const MAX_PER_CATEGORY = 20;

// Category-level metadata with a list of photos
const categories = [
    {
    title: "Trip to Peradeniya 2025",
    alt: "Trip to Peradeniya 2025",
    location: "Peradeniya",
    date: "2025-10-04",
    albumUrl: "https://photos.app.goo.gl/YOUR_ALBUM",
    photos: [
      { id: "01", src: "/gallery/ambuluwawa2025/557949611_1247906934042462_6337436313355771488_n.jpg" },
      { id: "02", src: "/gallery/ambuluwawa2025/557713905_1247906730709149_2171220989890356556_n.jpg" },
      { id: "03", src: "/gallery/ambuluwawa2025/557740041_1247906857375803_3487195262653272285_n.jpg" },
      { id: "04", src: "/gallery/ambuluwawa2025/557748226_1247906814042474_4045161704660407898_n.jpg" },
      { id: "05", src: "/gallery/ambuluwawa2025/558098435_1247906937375795_840156469024764564_n.jpg" },
      { id: "06", src: "/gallery/ambuluwawa2025/558860319_1247906774042478_8466563926172022709_n.jpg" },
      { id: "07", src: "/gallery/ambuluwawa2025/558882254_1247906947375794_4374626458833329897_n.jpg" },
      { id: "08", src: "/gallery/ambuluwawa2025/559365160_1247906710709151_3061900137935066186_n.jpg" },
      { id: "09", src: "/gallery/ambuluwawa2025/559464619_1247906750709147_9189392825273423890_n.jpg" },
      { id: "10", src: "/gallery/ambuluwawa2025/559552961_1247906944042461_6215943843210245660_n.jpg" },
      { id: "11", src: "/gallery/ambuluwawa2025/559892406_1247906860709136_407065835513119068_n.jpg" },
      { id: "12", src: "/gallery/ambuluwawa2025/561770095_1247906800709142_8148797682348018350_n.jpg" },
    ],
  },
      {
    title: "කොවුල් වසන්තය '25",
    alt: "කොවුල් වසන්තය '25",
    location: "Lalith athulathmudali ground - Kirulapone",
    date: "2025-04-05",
    albumUrl: "https://photos.app.goo.gl/YOUR_ALBUM",
    photos: [
      { id: "01", src: "/gallery/awrudu25/1.jpg" },
      { id: "02", src: "/gallery/awrudu25/2.jpg" },
      { id: "03", src: "/gallery/awrudu25/490173608_666626876304874_615699040961415958_n.jpg" },
      { id: "04", src: "/gallery/awrudu25/490138545_666626769638218_3683577342580633582_n.jpg" },
      { id: "05", src: "/gallery/awrudu25/490127740_666631006304461_8811581610325719188_n.jpg" },
      { id: "06", src: "/gallery/awrudu25/489697001_666629852971243_6674870109736651433_n.jpg" },
      { id: "07", src: "/gallery/awrudu25/489958743_666631142971114_5457891567059610647_n.jpg" },
      { id: "08", src: "/gallery/awrudu25/489959247_666654062968822_4587986584253382897_n.jpg" },
      { id: "09", src: "/gallery/awrudu25/490013002_666657366301825_4385283942111186330_n.jpg" },
      { id: "10", src: "/gallery/awrudu25/489811668_666654936302068_4320227326163778687_n.jpg" },
      { id: "11", src: "/gallery/awrudu25/490153264_666658209635074_4659589395900923928_n.jpg" },
      { id: "12", src: "/gallery/awrudu25/490184133_666652876302274_5838308971274859760_n.jpg" },
      { id: "13", src: "/gallery/awrudu25/490196945_666653266302235_6916149790821965043_n.jpg" },
      { id: "18", src: "/gallery/awrudu25/490570807_666646679636227_7954484713225937578_n.jpg" },
      { id: "14", src: "/gallery/awrudu25/490676108_666656772968551_7657678527484374076_n.jpg" },
      { id: "15", src: "/gallery/awrudu25/490344982_666632232971005_7377091768610966965_n.jpg" },
      { id: "16", src: "/gallery/awrudu25/490456478_666627509638144_5095802337176416125_n.jpg" },
      { id: "17", src: "/gallery/awrudu25/490311197_666630849637810_6998480568468656341_n.jpg" },

    ],
  },
  {
    title: "Navidad 24",
    alt: "Christmas Party 2024",
    location: "Glen Reception Hall",
    date: "2024-12-21",
    albumUrl: "https://photos.app.goo.gl/YOUR_ALBUM",
    photos: [
      { id: "Christmas01", src: "/gallery/navidad24/486530557_1091760912990399_6176415832645765489_n.jpg" },
      { id: "Christmas02", src: "/gallery/navidad24/486295364_1091760866323737_3736419832590707059_n.jpg" },
      { id: "Christmas03", src: "/gallery/navidad24/486603594_1091761036323720_5192291125936545835_n.jpg" },
      { id: "Christmas04", src: "/gallery/navidad24/486681014_1091761196323704_5950816272413761808_n.jpg" },
      { id: "Christmas05", src: "/gallery/navidad24/486196414_1091760856323738_6722614718792144794_n.jpg" },
      { id: "Christmas06", src: "/gallery/navidad24/486572075_1091760892990401_1006333540243840574_n.jpg" },
      { id: "Christmas07", src: "/gallery/navidad24/486676204_1091761042990386_2275111920779794432_n.jpg" },
      { id: "Christmas08", src: "/gallery/navidad24/486625695_1091760862990404_3402733192444088111_n.jpg" },
      { id: "Christmas09", src: "/gallery/navidad24/487083035_1091760839657073_3992000091442056811_n.jpg" },
      { id: "Christmas10", src: "/gallery/navidad24/486172773_1091760876323736_4821092343717661358_n.jpg" },
      { id: "Christmas11", src: "/gallery/navidad24/486525187_1091760829657074_136989484960661333_n.jpg" },
      { id: "Christmas12", src: "/gallery/navidad24/487227890_1091760849657072_7707836164072573859_n.jpg" },
      { id: "Christmas13", src: "/gallery/navidad24/486472088_1091760872990403_6052589372484359964_n.jpg" },
      { id: "Christmas14", src: "/gallery/navidad24/486681729_1091761232990367_5091805288739626495_n.jpg" },
    ],
  },

  {
    title: "Soluna 2025",
    alt: "Soluna Party 2025",
    location: "HOTEL ARIYANA REACH - MAHARAGAMA",
    date: "2025-12-08",
    albumUrl: "https://photos.app.goo.gl/YOUR_ALBUM",
    photos: [
      { id: "Soluna01", src: "/gallery/soluna25/3Q8A0020.jpg" },
      { id: "Soluna02", src: "/gallery/soluna25/3Q8A0162.jpg" },
      { id: "Soluna03", src: "/gallery/soluna25/3Q8A0064.jpg" },
      { id: "Soluna04", src: "/gallery/soluna25/3Q8A0174.jpg" },
      { id: "Soluna05", src: "/gallery/soluna25/3Q8A0359.jpg" },
      { id: "Soluna06", src: "/gallery/soluna25/3Q8A0503.jpg" },
      { id: "Soluna07", src: "/gallery/soluna25/4B1A8230.jpg" },
      { id: "Soluna08", src: "/gallery/soluna25/4B1A8242.jpg" },
      { id: "Soluna09", src: "/gallery/soluna25/4B1A8246.jpg" },
      { id: "Soluna10", src: "/gallery/soluna25/4B1A8272.jpg" },
      { id: "Soluna11", src: "/gallery/soluna25/4B1A8396.jpg" },
      { id: "Soluna12", src: "/gallery/soluna25/4B1A8441.jpg" },
      { id: "Soluna13", src: "/gallery/soluna25/4B1A8512.jpg" },
      { id: "Soluna14", src: "/gallery/soluna25/4B1A8630.jpg" },
      { id: "Soluna15", src: "/gallery/soluna25/4B1A8627.jpg" },
      { id: "Soluna16", src: "/gallery/soluna25/4B1A8635.jpg" },
      { id: "Soluna17", src: "/gallery/soluna25/4B1A8505.jpg" },
      { id: "Soluna18", src: "/gallery/soluna25/3Q8A0723.jpg" },
    ],
  },

];

// Flatten into the shape the UI uses
const photos = categories.flatMap((cat) =>
  cat.photos.map((p) => ({
    id: p.id,
    src: p.src,
    alt: p.alt ?? cat.alt ?? cat.title,
    category: cat.title,
    location: p.location ?? cat.location ?? "",
    date: p.date ?? cat.date ?? "",
    albumUrl: p.albumUrl ?? cat.albumUrl ?? "",
  }))
);

// Helper components
function SectionHeader({ title, Icon }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6" data-aos="fade-up">
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

// Gallery card
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

// Lightbox component
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
      <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
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

  // Derive categories list and prepare data
  const baseCategories = useMemo(
    () => Array.from(new Set(photos.map((p) => p.category))).sort(),
    []
  );

  // Lightbox state (scoped to the clicked category)
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const openLightbox = (items, index) => {
    setLightboxItems(items);
    setLightboxIndex(index);
  };
  const close = () => {
    setLightboxIndex(-1);
    setLightboxItems([]);
  };

  const prev = useCallback(
    () => setLightboxIndex((i) => (i <= 0 ? lightboxItems.length - 1 : i - 1)),
    [lightboxItems.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i >= lightboxItems.length - 1 ? 0 : i + 1)),
    [lightboxItems.length]
  );

  // Keyboard control
  useEffect(() => {
    if (lightboxIndex < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = origOverflow;
    };
  }, [lightboxIndex, prev, next]);

  return (
    <main className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero Section */}
      <section
        className="relative py-14 sm:py-18 md:py-28 text-center bg-cover bg-center bg-scroll md:bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('${headerBgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-50/70 to-white/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-18">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900" data-aos="fade-up">
            Gallery
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Moments from events — captured by our community.
          </p>
          <div className="mt-6 flex justify-center" data-aos="fade-up" data-aos-delay="200">
            <span className="inline-block w-24 h-1 rounded-full bg-blue-700" />
          </div>
        </div>
      </section>

      {/* Categorized Gallery (max 8 per category) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 mt-10 space-y-16">
        {baseCategories.map((cat, sectionIdx) => {
          const catPhotos = photos.filter((p) => p.category === cat);
          const limited = catPhotos.slice(0, MAX_PER_CATEGORY);
          return (
            <section key={cat} data-aos="fade-up" data-aos-delay={sectionIdx * 150}>
              <SectionHeader title={cat} Icon={FiCamera} />

              {limited.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
                  {limited.map((p, idx) => (
                    <div key={p.id} className="mb-4 break-inside-avoid inline-block w-full">
                      <GalleryCard
                        photo={p}
                        delay={150 + idx * 80}
                        onOpen={() => openLightbox(limited, idx)}
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
                  Nothing in this category yet — check back soon!
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Lightbox (uses the clicked category's limited items) */}
      {lightboxIndex >= 0 && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </main>
  );
}