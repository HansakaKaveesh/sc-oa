"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiClock,
  FiLinkedin,
  FiGithub,
  FiCheckCircle,
  FiAlertCircle,
  FiUsers, // added
} from "react-icons/fi";

// Replace these with your real details
const CONTACT_EMAIL = "club@example.com";
const CONTACT_PHONE = "+94 71 234 5678";
const ADDRESS = "No 126 High Level Rd, Colombo 11222";
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1064374634334!2d79.8771446!3d6.877849899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b0e8f383d73%3A0xd5ef7c7769be381!2sOpenArc%20Campus!5e0!3m2!1sen!2slk!4v1761401809401!5m2!1sen!2slk"; // optional: your Google Maps embed
const LINKEDIN_URL = "https://www.linkedin.com/company/YOUR_PAGE";
const GITHUB_URL = "https://github.com/YOUR_ORG";

// Replace with your actual Google Form URL (leave placeholder to use mailto fallback)
const GOOGLE_FORM_URL = "https://forms.gle/YOUR_FORM_ID";

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

function ContactCard({ Icon, label, value, href, delay = 0 }) {
  const Wrapper = href ? "a" : "div";
  const props = href
    ? {
        href,
        target: href?.startsWith("http") ? "_blank" : undefined,
        rel: href?.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};
  return (
    <Wrapper
      {...props}
      className={[
        "group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 block",
        href ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300" : "",
      ].join(" ")}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="mt-0.5 font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </Wrapper>
  );
}

function SocialLinks({ delay = 0 }) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {LINKEDIN_URL && (
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-600 hover:text-blue-700 transition-colors"
          title="LinkedIn"
        >
          <FiLinkedin className="h-6 w-6" />
        </a>
      )}
      {GITHUB_URL && (
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-600 hover:text-blue-700 transition-colors"
          title="GitHub"
        >
          <FiGithub className="h-6 w-6" />
        </a>
      )}
      {CONTACT_EMAIL && (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-label="Email"
          className="text-gray-600 hover:text-blue-700 transition-colors"
          title="Email"
        >
          <FiMail className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}

// Helpers
function initialsFromName(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Member contact card (new)
function MemberContactCard({ person, delay = 0 }) {
  const { name, role, image, email, phone, linkedin } = person;
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined;
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full overflow-hidden ring-4 ring-blue-50 bg-gradient-to-br from-blue-100 to-blue-50 grid place-items-center text-blue-700 font-bold">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={`${name} portrait`}
              className="h-full w-full object-cover"
              loading="lazy"
              onLoad={() => AOS.refresh()}
            />
          ) : (
            <span>{initialsFromName(name)}</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{name}</h3>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700"
            aria-label={`Email ${name}`}
            title="Email"
          >
            <FiMail className="h-4 w-4" />
            <span className="truncate">{email}</span>
          </a>
        )}
        {phone && (
          <a
            href={telHref}
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700"
            aria-label={`Call ${name}`}
            title="Phone"
          >
            <FiPhone className="h-4 w-4" />
            <span className="truncate">{phone}</span>
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700"
            aria-label={`${name} on LinkedIn`}
            title="LinkedIn"
          >
            <FiLinkedin className="h-4 w-4" />
            <span className="truncate">LinkedIn</span>
          </a>
        )}
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const hasRealForm =
    GOOGLE_FORM_URL && !GOOGLE_FORM_URL.includes("YOUR_FORM_ID");

  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const valid = name.trim().length >= 2 && emailOk && message.trim().length >= 10;

  const buildMailto = () => {
    const subject = `[Contact] ${topic} — ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Topic: ${topic}\n\n` +
      `${message}\n\n` +
      `— Sent from Contact page`;
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (website) return; // spam bot
    if (!valid) return;

    try {
      setStatus("loading");
      if (hasRealForm) {
        window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
        setStatus("success");
      } else if (CONTACT_EMAIL) {
        window.location.href = buildMailto();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8"
      data-aos="fade-up"
      data-aos-delay="150"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-700">
            Your name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          {!emailOk && email.length > 0 && (
            <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="topic" className="block text-sm text-gray-700">
            Topic
          </label>
          <select
            id="topic"
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option>General</option>
            <option>Join the club</option>
            <option>Events</option>
            <option>Collaboration</option>
            <option>Volunteering</option>
            <option>Other</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            placeholder="Tell us a bit about what you need..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="mt-1 text-xs text-gray-500">
            {Math.max(0, 10 - message.trim().length)} more characters to go…
          </div>
        </div>

        {/* Honeypot field (hidden from users) */}
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={!valid || status === "loading"}
          className={[
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-sm transition-colors",
            valid && status !== "loading"
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-gray-200 text-gray-500 cursor-not-allowed",
          ].join(" ")}
          aria-disabled={!valid || status === "loading"}
        >
          <FiSend className="h-4 w-4" />
          {status === "loading" ? "Sending..." : hasRealForm ? "Open form" : "Send message"}
        </button>

        <span className="text-xs text-gray-500">
          We aim to reply within 48 hours.
        </span>
      </div>

      {status === "success" && (
        <div className="mt-4 inline-flex items-center gap-2 text-green-700">
          <FiCheckCircle className="h-4 w-4" />
          Thanks! We’ve received your message.
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 inline-flex items-center gap-2 text-red-700">
          <FiAlertCircle className="h-4 w-4" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}
    </form>
  );
}

export default function ContactPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const headerBgUrl = "https://images.pexels.com/photos/5745183/pexels-photo-5745183.jpeg";

  // New: key contacts data (replace with real info)
  const keyContacts = [
    {
      name: "Jerushan Jacob",
      role: "President",
      image: "/unipics/comm/WhatsApp Image 2025-10-24 at 20.27.00_e8d7931c.jpg",
      email: "jerushan@example.com",
      phone: "+94 71 111 1111",
      linkedin: "https://www.linkedin.com/in/jerushan",
    },
    {
      name: "Chrishelle Natara",
      role: "secretary",
      image: "/unipics/comm/IMG-20251024-WA0011.jpg",
      email: "chrishelle@example.com",
      phone: "+94 77 222 2222",
      linkedin: "https://www.linkedin.com/in/chrishelle",
    },
    {
      name: "Roshan Farook",
      role: "Community Coordinator",
      image: "/dummy.webp",
      email: "roshan@example.com",
      phone: "+94 76 333 3333",
      linkedin: "https://www.linkedin.com/in/roshan",
    },
  ];

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
            Contact us
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Questions, ideas, or feedback? We’d love to hear from you.
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24 mt-10">
        {/* Quick contacts */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            Icon={FiMail}
            label="Email"
            value={CONTACT_EMAIL}
            href={`mailto:${CONTACT_EMAIL}`}
            delay={100}
          />
          <ContactCard
            Icon={FiPhone}
            label="Phone"
            value={CONTACT_PHONE}
            href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
            delay={160}
          />
          <ContactCard
            Icon={FiMapPin}
            label="Address"
            value={ADDRESS}
            href={
              ADDRESS
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    ADDRESS
                  )}`
                : undefined
            }
            delay={220}
          />
        </div>

        {/* Socials */}
        <div className="mt-6">
          <SocialLinks delay={120} />
        </div>

        {/* New: Key contacts (3 members) */}
        <div className="mt-12">
          <SectionHeader title="Key contacts" Icon={FiUsers} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {keyContacts.map((p, idx) => (
              <MemberContactCard key={p.email || p.name} person={p} delay={120 + idx * 60} />
            ))}
          </div>
        </div>

        {/* Form + Hours/Map */}
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeader title="Send us a message" Icon={FiSend} />
            <ContactForm />
          </div>

          <div className="lg:col-span-2">
            <div data-aos="fade-up" data-aos-delay="180">
              <SectionHeader title="Hours & location" Icon={FiClock} />
            </div>

            <div
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md p-6"
              data-aos="fade-up"
              data-aos-delay="220"
            >
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <FiClock className="h-4 w-4 text-blue-700" />
                  Mon–Fri, 10:00–18:00
                </li>
                <li className="flex items-center gap-2">
                  <FiMapPin className="h-4 w-4 text-blue-700" />
                  {ADDRESS}
                </li>
              </ul>

              {MAP_EMBED_URL && (
                <div className="mt-4 overflow-hidden rounded-lg border border-gray-100">
                  <div className="relative pt-[56%]">
                    <iframe
                      src={MAP_EMBED_URL}
                      title="Map"
                      className="absolute inset-0 h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}