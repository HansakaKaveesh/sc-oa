import {
  FiLinkedin,
  FiGithub,
  FiMail,
  FiUserPlus,
  FiClipboard,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiCompass,
} from 'react-icons/fi';

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

function MemberCard({ member }) {
  const { name, role, image, email, linkedin, github } = member;
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="h-20 w-20 rounded-full overflow-hidden ring-4 ring-blue-50 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={`${name} portrait`}
              className="h-full w-full object-cover"
              loading="lazy"
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
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
      </div>
    </section>
  );
}

// Small card for each join step
function StepCard({ Icon, title, text }) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-5">
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

// Join procedure section (tailored for Social & Adventure Club)
function JoinSection() {
  const steps = [
    {
      Icon: FiClipboard,
      title: 'Fill the form',
      text: 'Share your details and interests (hiking, socials, volunteering) so we can place you right.',
    },
    {
      Icon: FiCalendar,
      title: 'Welcome meetup & safety briefing',
      text: 'Join the next intro session to meet the crew and cover the basics.',
    },
    {
      Icon: FiUsers,
      title: 'Choose your activity group',
      text: 'Pick hiking, social events, volunteering—or mix and match.',
    },
    {
      Icon: FiCheckCircle,
      title: 'First event sign‑up',
      text: 'Grab a slot for an upcoming outing and get onboarded.',
    },
  ];

  return (
    <section id="join" className="mt-14">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-700">
          <FiUserPlus className="h-5 w-5" />
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Join Social & Adventure Club — Procedure</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) =>
          s.title === 'Fill the form' ? (
            <a
              key={s.title}
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded-2xl"
              aria-label="Open Google Form to join the Social & Adventure Club"
              title="Open Google Form"
            >
              <StepCard Icon={s.Icon} title={s.title} text={s.text} />
            </a>
          ) : (
            <StepCard key={s.title} Icon={s.Icon} title={s.title} text={s.text} />
          )
        )}
      </div>

      <div className="mt-8 text-center">
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Google Form to join the Social & Adventure Club"
          title="Open Google Form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
        >
          Join the club
        </a>
      </div>
    </section>
  );
}

export default function SocialAdventureClubPage() {
  const headerBgUrl = '/clubs/hero/adve.jpg';

  const socialAdventureTeam = [
    { name: 'Ayesha Ranasinghe', role: 'Club Lead', image: '/dummy.webp' },
    { name: 'Dilshan Perera', role: 'Events Lead', image: '/dummy.webp' },
    { name: 'Tharushi Jayasekara', role: 'Community Coordinator', image: '/dummy.webp' },
    { name: 'Ishara De Silva', role: 'Safety & Logistics', image: '/dummy.webp' },
  ];

  return (
    <main className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 ">
      <section
        className="relative py-14 sm:py-18 md:py-28 text-center bg-cover bg-center bg-scroll md:bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('${headerBgUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-50/70 to-white/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-18">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Social & Adventure Club
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg">
            Make friends, explore new places, and give back—through hikes, socials, and service events.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-24 h-1 rounded-full bg-blue-700" />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        <Section title="Leadership" Icon={FiCompass} members={socialAdventureTeam} />

        {/* Join procedure */}
        <JoinSection />
      </div>
    </main>
  );
}