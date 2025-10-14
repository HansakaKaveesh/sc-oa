import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const social = [
    { icon: <FaFacebook />, link: "https://facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, link: "https://instagram.com", label: "Instagram" },
    { icon: <FaYoutube />, link: "https://youtube.com", label: "YouTube" },
    { icon: <FaTiktok />, link: "https://tiktok.com", label: "TikTok" },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-gray-100 via-white to-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* ---------- Column 1 ---------- */}
        <div>
          <img
            src="/logo.png"
            alt="FCSC Logo"
            className="h-10 mx-auto md:mx-0 mb-4"
          />
          <p className="text-gray-700 text-sm leading-relaxed">
            OpenArc Campus Student Community (OCSC)<br />
            A collaborative platform connecting students, innovation, and technology.
          </p>
        </div>

        {/* ---------- Column 2 ---------- */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="text-gray-600 hover:text-orange-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#whatwedo" className="text-gray-600 hover:text-orange-600 transition">
                What We Do
              </a>
            </li>
            <li>
              <a href="#clubs" className="text-gray-600 hover:text-orange-600 transition">
                Clubs & Societies
              </a>
            </li>
            <li>
              <a href="#catchups" className="text-gray-600 hover:text-orange-600 transition">
                Catch Ups
              </a>
            </li>
          </ul>
        </div>

        {/* ---------- Column 3 ---------- */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-3">Connect With Us</h4>
          <div className="flex justify-center md:justify-start gap-4 text-orange-500 text-xl mb-4">
            {social.map((s, i) => (
              <a
                key={i}
                href={s.link}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-orange-600 transition-transform duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> <a href="mailto:ocsc@openarc.edu.lk" className="hover:text-orange-600">
              ocsc@openarc.edu.lk
            </a>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Phone:</strong> +94 11 754 4801
          </p>
        </div>
      </div>

      {/* Divider line */}
      <div className="border-t border-gray-200 mt-6"></div>

      {/* Bottom copyright */}
      <div className="text-center py-5 text-xs text-gray-500">
        © {new Date().getFullYear()} 
        <span className="font-medium text-orange-600">OpenArc Campus Student Community (OCSC)</span>. 
        All Rights Reserved.
      </div>

      {/* Decorative corner wave */}
      <svg
        className="absolute top-0 left-0 w-full h-6 text-orange-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,100 C480,0 960,150 1440,0 L1440,100 Z"
        ></path>
      </svg>
    </footer>
  );
}