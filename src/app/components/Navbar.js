"use client";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [clubsOpen, setClubsOpen] = useState(false); // For clubs dropdown

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "#whatwedo" },
    { name: "Committee", href: "/committee" },
    { name: "Clubs", href: "#clubs" }, // Placeholder
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#catchups" },
  ];

  const clubs = [
    { name: "English Club", href: "/clubs/english" },
    { name: "Media Club", href: "/clubs/media" },
    { name: "Social & Adventure Club", href: "/clubs/social" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-b-blue-100">
      {/* Top gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-900 via-blue-400 to-blue-900" />

      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* ---- Logo ---- */}
        <a href="#home" className="flex items-center gap-2">
          <img
            src="Logo SCOC.png"
            alt="SCOC Logo"
            className="h-10 w-auto hover:scale-105 transition-transform duration-300"
          />
          <span className="sr-only">SCOC Home</span>
        </a>

        {/* ---- Desktop Menu ---- */}
        <nav className="hidden md:flex gap-8 text-[15px] font-medium relative">
          {menuItems.map((item) =>
            item.name === "Clubs" ? (
              <div
                key="Clubs"
                className="relative group"
                onMouseEnter={() => setClubsOpen(true)}
                onMouseLeave={() => setClubsOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Clubs <FiChevronDown className="text-sm" />
                </button>
                {/* Dropdown Menu */}
                {clubsOpen && (
                  <div className="absolute left-0 top-6 bg-white border border-gray-200 shadow-lg rounded-md py-2 w-44 animate-fadeDown">
                    {clubs.map((club) => (
                      <a
                        key={club.name}
                        href={club.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition"
                      >
                        {club.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-blue-600 transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full duration-300"></span>
              </a>
            )
          )}
        </nav>

        {/* ---- Social + Mobile Toggle ---- */}
        <div className="flex items-center gap-5 text-blue-900 text-lg">
          <div className="hidden sm:flex gap-4">
            {[FaFacebook, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-blue-600 hover:scale-110 transition-transform"
                aria-label={`Social link ${i}`}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-gray-700 hover:text-orange-600 transition"
            aria-label="Toggle Menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ---- Mobile Nav Dropdown ---- */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 shadow-inner px-6 py-4 space-y-4 animate-fadeDown">
          {menuItems.map((item) =>
            item.name === "Clubs" ? (
              <div key="Clubs" className="space-y-2">
                <button
                  onClick={() => setClubsOpen(!clubsOpen)}
                  className="flex justify-between w-full text-gray-700 font-medium hover:text-orange-600 transition"
                >
                  Clubs <FiChevronDown className={`transform ${clubsOpen ? "rotate-180" : ""} transition`} />
                </button>
                {clubsOpen && (
                  <div className="pl-4 space-y-1">
                    {clubs.map((club) => (
                      <a
                        key={club.name}
                        href={club.href}
                        onClick={() => setOpen(false)}
                        className="block text-gray-600 hover:text-orange-500 transition"
                      >
                        {club.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-gray-700 font-medium hover:text-orange-600 transition"
              >
                {item.name}
              </a>
            )
          )}
          <div className="flex justify-center gap-5 text-blue-500 text-lg mt-3">
            {[FaFacebook, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-blue-600 hover:scale-110 transition-transform"
                aria-label={`Social link ${i}`}
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
