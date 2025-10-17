"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [clubsOpen, setClubsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Committee", href: "/committee" },
    { name: "Clubs", href: "#clubs" }, // dropdown trigger
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#catchups" },
  ];

  const clubs = [
    { name: "English Club", href: "/clubs/english" },
    { name: "Media Club", href: "/clubs/media" },
    { name: "Social & Adventure Club", href: "/clubs/social" },
  ];

  // Scroll background effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const onDocClick = (e) => {
      if (
        window.innerWidth >= 768 &&
        clubsOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setClubsOpen(false);
      }
    };

    const onEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setClubsOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [clubsOpen]);

  // Prevent background scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => {
    if (!href) return false;
    if (href.startsWith("/#")) return false; // skip section anchors
    if (href.startsWith("/clubs")) return pathname?.startsWith("/clubs");
    return pathname === href;
  };

  const linkBase =
    "relative text-gray-700 hover:text-blue-600 transition-colors group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur border-b border-b-blue-100 ${
        scrolled ? "bg-white/95 shadow-sm" : "bg-white/80"
      }`}
    >
      {/* Top gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-900 via-blue-400 to-blue-900" />

      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="SCOC Home">
          <img
            src="/Logo SCOC.png"
            alt="SCOC Logo"
            className="h-10 w-auto hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <nav
          className="hidden md:flex gap-8 text-[15px] font-medium relative"
          aria-label="Main"
        >
          {menuItems.map((item) =>
            item.name === "Clubs" ? (
              <div
                key="Clubs"
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setClubsOpen(true)}
                onMouseLeave={() => setClubsOpen(false)}
              >
                <button
                  type="button"
                  className={`${linkBase} flex items-center gap-1 ${
                    pathname?.startsWith("/clubs") ? "text-blue-600" : ""
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={clubsOpen}
                  aria-controls="clubs-dropdown"
                  onClick={() => setClubsOpen((v) => !v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setClubsOpen((v) => !v);
                    }
                  }}
                >
                  Clubs
                  <FiChevronDown
                    className={`text-sm transition-transform ${
                      clubsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {clubsOpen && (
                  <div
                    id="clubs-dropdown"
                    role="menu"
                    className="absolute left-0 top-5 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-56 animate-fadeDown"
                  >
                    {clubs.map((club) => (
                      <Link
                        key={club.name}
                        href={club.href}
                        role="menuitem"
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        onClick={() => setClubsOpen(false)}
                      >
                        {club.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={linkBase}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            )
          )}
        </nav>

        {/* Social + Mobile Toggle */}
        <div className="flex items-center gap-5 text-blue-900 text-lg">
          <div className="hidden sm:flex gap-4">
            {[FaFacebook, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-blue-600 hover:scale-110 transition-transform rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Social link ${i + 1}`}
              >
                <Icon />
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-2xl text-gray-700 hover:text-orange-600 transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white/95 border-t border-gray-200 shadow-inner px-6 py-4 space-y-4 animate-fadeDown"
          role="dialog"
          aria-modal="true"
        >
          {menuItems.map((item) =>
            item.name === "Clubs" ? (
              <div key="Clubs" className="space-y-2">
                <button
                  onClick={() => setClubsOpen((v) => !v)}
                  className="flex justify-between w-full text-gray-700 font-medium hover:text-orange-600 transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-expanded={clubsOpen}
                  aria-controls="mobile-clubs"
                >
                  Clubs
                  <FiChevronDown
                    className={`transition-transform ${
                      clubsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  id="mobile-clubs"
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    clubsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {clubs.map((club) => (
                    <Link
                      key={club.name}
                      href={club.href}
                      onClick={() => setOpen(false)}
                      className="block pl-4 py-1 text-gray-600 hover:text-orange-500 transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      {club.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium hover:text-orange-600 transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {item.name}
              </Link>
            )
          )}

          <div className="flex justify-center gap-5 text-blue-500 text-lg mt-3">
            {[FaFacebook, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-blue-600 hover:scale-110 transition-transform rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={`Social link ${i + 1}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
