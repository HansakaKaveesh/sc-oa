export default function Specializations() {
  const specs = [
    "Data Science",
    "Software Engineering",
    "Cyber Security",
    "Information Systems",
    "Interactive Media",
    "Information Technology",
  ];

  return (
    <section
      id="specializations"
      className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Our <span className="text-orange-600">Specializations</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-lg">
          The OpenArc Campus offers diverse fields of study that
          nurture expertise from software building to cybersecurity leadership.
        </p>

        {/* Specialization bubbles */}
        <ul className="flex flex-wrap justify-center gap-6">
          {specs.map((s, index) => (
            <li
              key={index}
              className="group relative bg-white shadow-md hover:shadow-xl border border-orange-100
                         rounded-full px-8 py-5 text-sm md:text-base font-semibold text-gray-700
                         transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-r
                         from-orange-500/10 via-orange-50 to-orange-500/10 backdrop-blur-sm"
            >
              {/* Decorative gradient ring */}
              <span className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-orange-400 transition-all duration-500"></span>
              <span className="relative z-10">{s}</span>
            </li>
          ))}
        </ul>

        {/* Decorative divider */}
        <div className="mt-16 flex justify-center">
          <span className="inline-block w-24 h-1 rounded-full bg-orange-500"></span>
        </div>
      </div>
    </section>
  );
}