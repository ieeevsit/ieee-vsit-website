import React from 'react';

const lumaLinks = {
  "AI & Machine Learning Bootcamp": "https://lu.ma/ai-ml-bootcamp",
  "The Future of Quantum Computing": "https://lu.ma/quantum-future"
};

const events = [
  {
    title: "AI & Machine Learning Bootcamp",
    type: "Workshop",
    desc: "A deep dive into neural networks and practical applications with Python and TensorFlow.",
    img: "Workshop"
  },
  {
    title: "The Future of Quantum Computing",
    type: "Seminar",
    desc: "An expert talk on the breakthroughs and future landscape of quantum tech.",
    img: "Seminar"
  }
];

const EventsSection = () => (
  <section id="events" className="py-14 sm:py-20">
    <div className="container mx-auto px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Upcoming Events</h2>
      <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
      <div className="flex flex-col gap-8 items-center md:flex-row md:justify-center md:gap-10">
        {events.map(event => (
          <div
            key={event.title}
            className="glass-card rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 w-full max-w-md md:w-96 flex flex-col"
          >
            <img
              src={`https://placehold.co/600x400/0a0a0a/3b82f6?text=${event.img}`}
              alt="Event"
              className="w-full h-40 sm:h-52 object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs sm:text-sm text-blue-400">{event.type}</span>
              <h3 className="text-lg sm:text-xl font-bold my-1 sm:my-2">{event.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4 flex-1">{event.desc}</p>
              <a
                href={lumaLinks[event.title]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 sm:py-3 rounded-lg shadow-lg transition-all duration-300 text-center text-base sm:text-lg tracking-wide ring-1 ring-blue-400/30 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{
                  boxShadow: '0 4px 24px 0 rgba(59,130,246,0.15)'
                }}
              >
                Register Now
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* If no events, show a message */}
      {events.length === 0 && (
        <div className="text-center text-gray-400 mt-10 text-lg">
          Stay tuned for our next event!
        </div>
      )}
    </div>
  </section>
);

export default EventsSection;
