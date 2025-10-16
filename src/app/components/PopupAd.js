'use client';

import { useEffect, useState, useCallback } from 'react';
import { FiX } from 'react-icons/fi';

export default function PopupAd({
  title = 'Don’t miss out!',
  description = 'Join our next event. Limited slots available.',
  imageSrc, // e.g., '/ads/ad.jpg'
  ctaText = 'Learn more',
  ctaHref = '#',
  delayMs = 1200,      // time before showing (ms)
  cooldownDays = 7,    // don’t show again within N days
  storageKey = 'popup_ad_seen',
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const last = localStorage.getItem(storageKey);
      if (last) {
        const lastTime = parseInt(last, 10);
        if (!Number.isNaN(lastTime)) {
          const diff = Date.now() - lastTime;
          if (diff < cooldownDays * 24 * 60 * 60 * 1000) return;
        }
      }
    } catch {
      // ignore storage errors
    }
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [mounted, delayMs, cooldownDays, storageKey]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // ignore storage errors
    }
  }, [storageKey]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={close}
      aria-modal="true"
      role="dialog"
      aria-labelledby="popup-ad-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-full p-1"
          onClick={close}
          aria-label="Close"
        >
          <FiX className="h-5 w-5" />
        </button>

        {imageSrc && (
          <img src={imageSrc} alt="" className="h-40 w-full object-cover" loading="lazy" />
        )}

        <div className="p-5">
          <h3 id="popup-ad-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 shadow-sm"
            >
              {ctaText}
            </a>
            <button
              onClick={close}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}