import React from 'react';

const EventsSection = () => (
  <section id="events" className="py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Upcoming Events</h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto mb-12"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "AI & Machine Learning Bootcamp", type: "Workshop", desc: "A deep dive into neural networks and practical applications with Python and TensorFlow.", img: "Workshop" },
          { title: "IEEE Xtreme 24-Hour Challenge", type: "Competition", desc: "Join teams from around the world in a global programming competition.", img: "Competition" },
          { title: "The Future of Quantum Computing", type: "Seminar", desc: "An expert talk on the breakthroughs and future landscape of quantum tech.", img: "Seminar" },
        ].map(event => (
          <div key={event.title} className="glass-card rounded-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img src={`https://placehold.co/600x400/0a0a0a/3b82f6?text=${event.img}`} alt="Event Image" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-sm text-blue-400">{event.type}</span>
              <h3 className="text-xl font-bold my-2">{event.title}</h3>
              <p className="text-gray-400 text-sm">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
