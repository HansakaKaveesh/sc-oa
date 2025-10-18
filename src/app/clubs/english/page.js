"use client";

import { useEffect } from "react";
import {
  FiLinkedin,
  FiGithub,
  FiMail,
  FiShield,
  FiUserPlus,
  FiClipboard,
  FiCalendar,
  FiMessageSquare,
  FiCheckCircle,
} from 'react-icons/fi';
import AOS from "aos";
import "aos/dist/aos.css";

// Replace with your actual Google Form URL
const GOOGLE_FORM_URL = 'https://forms.gle/YOUR_FORM_ID';

function initialsFromName(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function MemberCard({ member, delay = 0 }) {
  const { name, role, image, email, linkedin, github } = member;
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col items-center text-center w-64"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="relative mb-4">
        <div className="h-20 w-20 rounded-full overflow-hidden ring-4 ring-blue-50 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={`${name} portrait`}
              className="h-full w-full object-cover"
              loading="lazy"
              onLoad={() => AOS.refresh()}
            />
          ) : (
            <span className="text-blue-700 font-bold">{initialsFromName(name)}</span>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>

      <div className="mt-4 flex items-center gap-3">
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="text-gray-500 hover:text-blue-700 transition-colors"
            title="LinkedIn"
          >
            <FiLinkedin className="h-5 w-5" />
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="text-gray-500 hover:text-blue-700 transition-colors"
            title="GitHub"
          >
            <FiGithub className="h-5 w-5" />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${name}`}
            className="text-gray-500 hover:text-blue-700 transition-colors"
            title="Email"
          >
            <FiMail className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}

function Section({ title, Icon, members }) {
  return (
    <section className="mt-10">
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

      {/* Center cards */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {members.map((m, idx) => (
          <MemberCard key={m.name} member={m} delay={150 + idx * 100} />
        ))}
      </div>
    </section>
  );
}

// Small card for each join step
function StepCard({ Icon, title, text, delay = 0 }) {
  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 w-64"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-md font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-gray-600">{text}</p>
    </div>
  );
}

// Join procedure section
function JoinSection() {
  const steps = [
    {
      Icon: FiClipboard,
      title: 'Fill the form',
      text: 'Share your name, email, and interests so we can place you in the right activities.',
    },
    {
      Icon: FiCalendar,
      title: 'Attend an intro meetup',
      text: 'Join our next session to learn how the club works and meet the team.',
    },
    {
      Icon: FiMessageSquare,
      title: 'Placement activity',
      text: 'A quick, friendly chat or short task to gauge your comfort level.',
    },
    {
      Icon: FiCheckCircle,
      title: 'Get onboarded',
      text: 'We’ll add you to the group, share the schedule, and you’re in!',
    },
  ];

  const baseDelay = 150;
  const step = 120;

  return (
    <section id="join" className="mt-14">
      <div
        className="flex items-center justify-center gap-3 mb-6"
        data-aos="fade-up"
        data-aos-delay="0"
      >
        <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-700">
          <FiUserPlus className="h-5 w-5" />
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Join the Club — Procedure</h2>
      </div>

      {/* Center step cards */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {steps.map((s, idx) =>
          s.title === 'Fill the form' ? (
            <a
              key={s.title}
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-2xl"
              aria-label="Open Google Form to join the club"
              title="Open Google Form"
            >
              <StepCard Icon={s.Icon} title={s.title} text={s.text} delay={baseDelay + idx * step} />
            </a>
          ) : (
            <StepCard key={s.title} Icon={s.Icon} title={s.title} text={s.text} delay={baseDelay + idx * step} />
          )
        )}
      </div>

      <div className="mt-8 text-center" data-aos="zoom-in" data-aos-delay={baseDelay + steps.length * step}>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Google Form to join the club"
          title="Open Google Form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
        >
          Join the club
        </a>
      </div>
    </section>
  );
}

export default function EnglishClubPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const headerBgUrl = '/clubs/hero/english.jpg';

  const englishClubTeam = [
    { name: 'Hiruni Prabodha', role: 'President', image: '/dummy.webp' },
    { name: 'Nethmi Dias', role: 'Secretary', image: '/dummy.webp' },
    { name: 'Nisuli Jayasooriya', role: 'PR & Marketing', image: '/dummy.webp' },
    { name: 'Chrishelle Natara', role: 'Executive Committee', image: '/dummy.webp' },
    { name: 'Jerushan Daniel', role: 'Executive Committee', image: '/dummy.webp' },
  ];

  return (
    <main className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100">
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
            English Club
          </h1>
          <p
            className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Building confidence in communication through activities, workshops, and collaboration.
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        <div data-aos="fade-up" data-aos-delay="100">
          <Section title="Leadership" Icon={FiShield} members={englishClubTeam} />
        </div>

        {/* Join procedure */}
        <div data-aos="fade-up" data-aos-delay="150">
          <JoinSection />
        </div>
      </div>
    </main>
  );
}
