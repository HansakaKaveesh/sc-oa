import {
  FiLinkedin,
  FiGithub,
  FiMail,
  FiAward,
  FiUsers,
  FiCode,
  FiShield,
  FiCamera,
} from 'react-icons/fi';

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
      {/* Avatar */}
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

      {/* Name + Role */}
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>

      {/* Socials */}
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

export default function CommitteePage() {
  const year = '2024/25';
  const headerBgUrl =
    'hero2.jpg';

  // Committee sections
  const committeeSections = [
    {
      title: 'Executive Committee',
      Icon: FiAward,
      members: [
        {
          name: 'Jerushan Jacob',
          role: 'President',
          image:
            'dummy.webp',

        },
        {
          name: 'Uvindu Eshan',
          role: 'Vice President',
          image:
            'dummy.webp',
        },
        {
          name: 'Chrishelle Natara',
          role: 'Secretary',
          image:
            'dummy.webp',

        },
        {
          name: 'Rashan',
          role: 'Vice Secretary',
          image:
            'dummy.webp',
        },
        {
          name: 'Hansaka Wijesinghe',
          role: 'Treasurer',
          image:
            'dummy.webp',
         
        },
        {
          name: 'Hansaja',
          role: 'Vice Treasurer',
          image:
            'dummy.webp',
        },
      ],
    },
    {
      title: 'Committee Members',
      Icon: FiUsers,
      members: [
        {
          name: 'Emily Tan',
          role: 'Events Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Rahul Mehta',
          role: 'Tech Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Sara Lee',
          role: 'Media Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Daniel Kim',
          role: 'Outreach Lead',
          image:
            'dummy.webp',
        },
      ],
    },
  ];

  // Club sections (3 clubs, each with their own members)
  const clubSections = [
    {
      title: 'Media Club',
      Icon: FiCamera,
      members: [
        {
          name: 'Kevin Silva',
          role: 'Club Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Maya Dias',
          role: 'Co‑Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Ruwan Jayasuriya',
          role: 'Coordinator',
          image:
            'dummy.webp',
        },
        {
          name: 'Anushka Fernando',
          role: 'Mentor',
          image:
            'dummy.webp',
        },
      ],
    },
    {
      title: 'English Club',
      Icon: FiShield,
      members: [
        {
          name: 'Ayesha Ranasinghe',
          role: 'Club Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Dilshan Perera',
          role: 'Blue Team Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Tharushi Jayasekara',
          role: 'CTF Coordinator',
          image:
            'dummy.webp',
        },
        {
          name: 'Ishara De Silva',
          role: 'Research Lead',
          image:
            'dummy.webp',
        },
      ],
    },
    {
      title: 'Social Club and Adventure Club',
      Icon: FiCamera,
      members: [
        {
          name: 'Nadia Fernando',
          role: 'Club Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Amal Jayawardena',
          role: 'Videography Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Minuri Peiris',
          role: 'Graphics Lead',
          image:
            'dummy.webp',
        },
        {
          name: 'Shehan Dias',
          role: 'Photography Lead',
          image:
            'dummy.webp',
        },
      ],
    },
  ];

  return (
    <main className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 ">
      {/* Header with background image */}
      <section
        className="relative py-14 sm:py-18 md:py-28 text-center bg-cover bg-center bg-scroll md:bg-fixed overflow-hidden"
        style={{ backgroundImage: `url('${headerBgUrl}')` }}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-50/70 to-white/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-18">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            Student Council Committee <span className="text-blue-700">{year}</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-base sm:text-lg">
            Meet the team behind OCSC—planning events, leading initiatives, and supporting
            students across the campus.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-24 h-1 rounded-full bg-blue-700" />
          </div>
        </div>
      </section>

      {/* Committee sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {committeeSections.map((sec) => (
          <Section key={sec.title} title={sec.title} Icon={sec.Icon} members={sec.members} />
        ))}
      </div>

      {/* Clubs header */}
      <section className="mt-14 sm:mt-16 text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Club Leadership</h2>
          <p className="max-w-2xl mx-auto mt-3 text-gray-600">
            Dedicated leadership teams for each club coordinate activities, projects, and mentorship.
          </p>
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-20 h-1 rounded-full bg-blue-700" />
          </div>
        </div>
      </section>

      {/* Club sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        {clubSections.map((sec) => (
          <Section key={sec.title} title={sec.title} Icon={sec.Icon} members={sec.members} />
        ))}

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg shadow-sm hover:bg-blue-800 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </main>
  );
}