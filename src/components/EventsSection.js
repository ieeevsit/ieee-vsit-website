import React from 'react';

const EventsSection = () => (
  <section id="events" className="py-14 sm:py-20">
    <div className="container mx-auto px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Upcoming Events</h2>
      <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[
          { title: "AI & Machine Learning Bootcamp", type: "Workshop", desc: "A deep dive into neural networks and practical applications with Python and TensorFlow.", img: "Workshop" },
          { title: "IEEE Xtreme 24-Hour Challenge", type: "Competition", desc: "Join teams from around the world in a global programming competition.", img: "Competition" },
          { title: "The Future of Quantum Computing", type: "Seminar", desc: "An expert talk on the breakthroughs and future landscape of quantum tech.", img: "Seminar" },
        ].map(event => (
          <div key={event.title} className="glass-card rounded-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 min-w-0">
            <img src={`https://placehold.co/600x400/0a0a0a/3b82f6?text=${event.img}`} alt="Event Image" className="w-full h-36 sm:h-48 object-cover" />
            <div className="p-4 sm:p-6">
              <span className="text-xs sm:text-sm text-blue-400">{event.type}</span>
              <h3 className="text-lg sm:text-xl font-bold my-1 sm:my-2">{event.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
