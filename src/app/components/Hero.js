export default function Hero() {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center text-center text-gray-800"
      style={{
        backgroundImage:
          "url('https://sankara.ac.in/polytechnic/wp-content/uploads/2023/07/committe-intro.jpg')",
        backgroundAttachment: "scroll", // avoids janky fixed backgrounds on mobile
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        {/* Logo */}
        <div className="mb-6 sm:mb-10 drop-shadow-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfbRB3ylglcag8uiCkKi3f-_X82QXBEb0GeA&s"
            alt="FCSC logo"
            className="rounded-lg mx-auto w-28 h-28 sm:w-36 sm:h-36 object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 leading-snug sm:leading-tight">
          OpenArc Campus <br className="hidden sm:block" />
          <span className="text-orange-600">Student Community</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-md sm:max-w-xl mx-auto mt-4 sm:mt-6 text-gray-700 text-base sm:text-lg leading-relaxed">
          OCSC is a student‑driven organization that unites all undergraduates
          under one platform to grow together through collaboration, learning,
          and innovation.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#about"
            className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition w-full sm:w-auto"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-orange-600 text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition w-full sm:w-auto"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Decorative bottom wave */}
      
    </section>
  );
}