export default function CatchUps() {
  const updates = [
    {
      title: "Official Merchandise Pack 2025/26",
      text: "Your exclusive hoodie, t‑shirt, and accessories are now available at all centers. Grab your limited edition pack today!",
      img: "Post.png",
      link: "#",
      tag: "Merch Drop",
    },
    {
      title: "OpenArc Annual Trip 2025",
      text: "A day full of fun, learning, and adventure! Join us as we explore Ambuluwa Tower, Kadugannawa Tea Factory, and Peradeniya University.",
      img: "Trip.png",
      link: "#",
      tag: "Event Highlights",
    },
    {
      title: "Study Support — Build your Confidence",
      text: "Join our upcoming peer‑learning sessions organized by OCSC tutors. Learn collaboratively and strengthen your fundamentals.",
      img: "https://fcsc.lk/images/study-support.jpg",
      link: "#",
      tag: "Academics",
    },
  ];

  return (
    <section
      id="catchups"
      className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Catch <span className="text-orange-600">Ups</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay in the loop with our latest updates, events, and announcements
            happening across the OpenArc Campus.
          </p>
        </div>

        {/* Grid of Updates */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="overflow-hidden h-52">
                <img
                  src={item.img}
                  alt={item.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Tag badge */}
              <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {item.tag}
              </span>

              {/* Text Content */}
              <div className="p-5 text-left">
                <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-16 flex justify-center">
          <span className="inline-block w-24 h-1 rounded-full bg-orange-500"></span>
        </div>
      </div>
    </section>
  );
}