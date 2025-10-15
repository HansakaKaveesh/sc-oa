import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* ------- Image ------- */}
        <div className="order-1 md:order-2 group relative">
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-300 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <img
            src="/Gemini_Generated_Image_u0abmtu0abmtu0abcopy.png"
            alt="OCSC events"
            className="relative rounded-3xl shadow-xl object-cover w-full h-64 sm:h-72 md:h-[420px] transform group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* ------- Text Content ------- */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 relative">
            <span className="absolute -left-4 top-2 w-1 h-8 bg-blue-800 rounded-full hidden md:block"></span>
            What is{" "}
            <span className="text-blue-800">OpenArc Campus Student Community</span>?
          </h2>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
            The <strong>OpenArc Campus Student Community (OCSC)</strong> is the
            primary student body representing the Faculty of Computing at OpenArc Campus.
            It unites student‑led societies, technical clubs, and innovation groups under one platform.
          </p>

          <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
            Our mission is to empower computing students to engage, collaborate,
            and showcase their potential through learning opportunities,
            hackathons, and creative initiatives. From beginner programmers to
            advanced developers — there’s a place for everyone here.
          </p>

          {/* Icon list (react-icons) */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <li className="flex items-center gap-2 text-gray-700">
              <FiCheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" aria-hidden />
              Student‑led societies & clubs
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <FiCheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" aria-hidden />
              Hackathons & events
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <FiCheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" aria-hidden />
              Peer learning & workshops
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <FiCheckCircle className="h-5 w-5 text-blue-700 flex-shrink-0" aria-hidden />
              Innovation & creativity
            </li>
          </ul>

          <a
            href="#whatwedo"
            className="inline-flex items-center gap-2 mt-3 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition duration-300"
          >
            Explore What We Do
            <FiArrowRight className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}