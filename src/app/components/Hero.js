export default function Hero() {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center text-center text-gray-800"
      style={{
        backgroundImage:
          "url('https://sankara.ac.in/polytechnic/wp-content/uploads/2023/07/committe-intro.jpg')",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 animate-fadeIn">
        {/* Logo Image */}
        <div className="mb-8 drop-shadow-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbRB3ylglcag8uiCkKi3f-_X82QXBEb0GeA&s"
            alt="FCSC logo"
            className="rounded-lg  mx-auto w-40 h-40 object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 leading-tight">
          OpenArc Campus <br className="hidden md:block" />
          <span className="text-orange-600">Student Community</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto mt-6 text-gray-700 text-lg leading-relaxed">
          OCSC is a student‑driven organization that unites all undergraduates
          under one platform to grow together through collaboration, learning,
          and innovation.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#about"
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,90.7C1120,85,1280,75,1360,69.3L1440,64V100H0Z"
        ></path>
      </svg>
    </section>
  );
}