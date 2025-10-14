export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 relative">
            <span className="absolute -left-6 top-2 w-1 h-10 bg-orange-500 rounded-full hidden sm:block"></span>
            What is <span className="text-orange-600">OpenArc Campus Student Community</span>?
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            The <strong>OpenArc Campus Student Community (OCSC)</strong> is
            the primary student body representing the Faculty of Computing at OpenArc Campus.
            It unites a diverse range of student‑led societies, technical clubs,
            and innovation groups under one platform.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Our mission is to empower computing students to engage, collaborate, and
            showcase their potential through learning opportunities, hackathons,
            and creative community initiatives. From beginner programmers to
            advanced developers — there’s a place for everyone here.
          </p>

          <a
            href="#whatwedo"
            className="inline-block mt-3 px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow-sm hover:bg-orange-700 transition duration-300"
          >
            Explore What We Do
          </a>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 group relative">
          <div className="absolute -inset-2 bg-gradient-to-tr from-orange-300 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <img
            src="/Gemini_Generated_Image_u0abmtu0abmtu0abcopy.png" 
            alt="FCSC event"
            className="relative rounded-3xl shadow-xl object-cover w-full h-80 md:h-[420px] transform group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}