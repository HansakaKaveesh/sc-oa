"use client";
import { useState } from "react";
import { FaBars, FaTimes, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    
    { name: "Events", href: "#whatwedo" },
    { name: "Committee", href: "#specializations" },
    { name: "Gallery", href: "#clubs" },
    { name: "Contact", href: "#catchups" },
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
            alt="FCSC Logo"
            className="h-10 w-auto hover:scale-105 transition-transform duration-300"
          />
          <span className="sr-only">FCSC Home</span>
        </a>

        {/* ---- Desktop Menu ---- */}
        <nav className="hidden md:flex gap-8 text-[15px] font-medium">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-gray-700 hover:text-orange-600 transition-colors group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full duration-300"></span>
            </a>
          ))}
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
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-orange-600 transition"
            >
              {item.name}
            </a>
          ))}
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