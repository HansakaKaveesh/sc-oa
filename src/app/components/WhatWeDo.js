export default function WhatWeDo() {
  const activities = [
    {
      title: "Build Up Wednesday",
      img: "https://www.sliit.lk/wp-content/uploads/2023/09/fcsc_build_up_wednesday.jpg",
      text: "Weekly workshops and discussions that strengthen technical skills and collaboration within the student community.",
    },
    {
      title: "Study Support Sessions",
      img: "https://www.sliit.lk/wp-content/uploads/2023/11/fcsc_study_support.jpg",
      text: "Peer‑to‑peer support sessions helping students handle challenging subjects, share study strategies, and improve together.",
    },
    {
      title: "Wirmaya",
      img: "https://www.sliit.lk/wp-content/uploads/2023/08/fcsc_wirmaya_event.jpg",
      text: "An annual talent show that spotlights creativity, diversity, and the artistic side of our computing students.",
    },
  ];

  return (
    <section
      id="whatwedo"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
          What We Do
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-10 sm:mb-12 text-base sm:text-lg">
          From technical learning programs to vibrant student events, OCSC drives
          creativity, knowledge, and collaboration throughout the Student Community.
        </p>

        {/* Activity cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {activities.map((a, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden h-48 sm:h-56 md:h-60 flex-shrink-0">
                <img
                  src={a.img}
                  alt={a.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="absolute bottom-3 left-3 text-white text-base sm:text-lg font-semibold tracking-wide drop-shadow-lg">
                  {a.title}
                </h3>
              </div>

              {/* Text */}
              <div className="p-4 sm:p-5 text-left flex-grow flex items-center">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {a.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative divider */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <span className="inline-block w-20 sm:w-24 h-1 rounded-full bg-orange-500"></span>
        </div>
      </div>
    </section>
  );
}