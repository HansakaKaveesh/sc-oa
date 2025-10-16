import { FiMapPin,FiUsers, FiMusic, FiArrowRight, FiCalendar } from 'react-icons/fi';

export default function WhatWeDo() {
  const activities = [
    {
  title: 'Annual Trip',
  img: 'wwd1.jpg',
  text:
    'A memorable getaway for students to relax, bond, and create unforgettable memories outside the classroom.',
  icon: FiMapPin,
  tag: 'Event',
  accent: 'blue',
},
{
  title: 'BIT Welcome Forum 2025',
  img: 'wwd2.jpg',
  text:
    'A warm and energetic welcome event to greet the new batch of BIT students and introduce them to the campus community.',
  icon: FiUsers,
  tag: 'Forum',
  accent: 'green',
},
{
  title: "කොවුල් වසන්තය '25",
  img: 'wwd3.jpg',
  text:
    'A cultural celebration filled with music, dance, and tradition — embracing the beauty of Sri Lankan student life.',
  icon: FiMusic,
  tag: 'Cultural Event',
  accent: 'purple',
},

  ];

  const badgeByAccent = {
    blue: 'bg-blue-50 text-blue-700 ring-blue-200',
    green: 'bg-green-50 text-green-700 ring-green-200',
    purple: 'bg-purple-50 text-purple-700 ring-purple-200',
  };

  return (
    <section
      id="whatwedo"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          What We Do
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-10 sm:mb-12 text-base sm:text-lg">
          From technical learning programs to vibrant student events, OCSC drives
          creativity, knowledge, and collaboration throughout the Student Community.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {activities.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md overflow-hidden transition-all duration-500 flex flex-col hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-60 flex-shrink-0">
                  <img
                    src={a.img}
                    alt={`${a.title} - OCSC activity`}
                    loading="lazy"
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ${badgeByAccent[a.accent]}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {a.tag}
                    </span>
                  </div>

                  <h3 className="absolute bottom-3 left-3 text-white text-base sm:text-lg font-semibold tracking-wide drop-shadow-lg">
                    {a.title}
                  </h3>
                </div>

                <div className="p-4 sm:p-5 text-left flex flex-col flex-1">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {a.text}
                  </p>

                  <div className="mt-4">
                    <a
                      href="#"
                      aria-label={`Learn more about ${a.title}`}
                      className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                    >
                      Learn more
                      <FiArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-6">
          <span className="inline-block w-20 sm:w-24 h-1 rounded-full bg-blue-800"></span>

          <a
            href="#events"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <FiCalendar className="h-5 w-5" aria-hidden />
            View all events
          </a>
        </div>
      </div>
    </section>
  );
}