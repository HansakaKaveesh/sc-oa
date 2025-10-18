"use client";

import { useEffect, useRef, useState } from "react";

export default function AdPopup({
  campaignId = "default",         // Change per campaign to reset visibility
  delayMs = 1200,                 // Delay before showing (ms)
  frequencyMinutes = 5,           // Don’t show again for N minutes after close
  oncePerSession = false,         // If true, hide for current tab session
  title = "OFFICIAL WRISTBAND!!",
  text = "EXCLUSIVE OPENARC CAMPUS WRISTBANDS.",
  imageSrc = "/ads/sample.jpg",   // Optional hero image
  ctaText = "Buy Now",
  ctaHref = "/buy-wristband",
  showCloseLabel = true,
}) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const storageKey = `adPopup:${campaignId}`;

  // Decide storage: localStorage (persist days) or sessionStorage (per session)
  const getStore = () => {
    try {
      return oncePerSession ? window.sessionStorage : window.localStorage;
    } catch {
      return null;
    }
  };

  // Show after delay if not recently dismissed
  useEffect(() => {
    const store = getStore();
    let timer;
    try {
      const raw = store?.getItem(storageKey);
      const data = raw ? JSON.parse(raw) : null;
      if (data?.hideUntil && Date.now() < data.hideUntil) {
        return; // still within cooldown
      }
    } catch {
      // ignore
    }

    timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [campaignId, delayMs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Prevent background scroll + Esc to close + focus management
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button for accessibility
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const handleClose = () => {
    const store = getStore();
    try {
      const hideUntil = oncePerSession
        ? Date.now() + 60 * 60 * 1000 // 1 hour session-ish cooldown
        : Date.now() + frequencyDays * 24 * 60 * 60 * 1000;
      store?.setItem(storageKey, JSON.stringify({ hideUntil }));
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const handleCta = () => {
    handleClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ad-modal-title"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-[min(90vw,30rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-md bg-white/80 px-2 py-1 text-sm text-gray-700 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          aria-label="Close advertisement"
        >
          ✕ {showCloseLabel ? "Close" : ""}
        </button>

        {/* Image (optional) */}
        {imageSrc ? (
          <div className="relative h-88 w-full sm:h-120 overflow-hidden">
            <img
              src={imageSrc}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 id="ad-modal-title" className="text-2xl font-bold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-gray-600">{text}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={ctaHref}
              onClick={handleCta}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-white shadow-sm transition-colors hover:bg-blue-800"
            >
              {ctaText}
            </a>
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-700"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}