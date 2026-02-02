import React from 'react';

interface Event {
  title: string;
  type: string;
  desc: string;
  img: string;
}

interface LumaLinks {
  [key: string]: string;
}

const lumaLinks: LumaLinks = {
  "NewTech Horizons": "https://luma.com/7ymlch3s",
};

// Set to empty array when no events are scheduled
const events: Event[] = [
  // Uncomment and modify when you have an event:
  // {
  //   title: "",
  //   type: "",
  //   desc: "",
  //   img: ""
  // }
];

const EventsSection: React.FC = () => (
  <section id="events" className="py-14 sm:py-20 bg-gray-900/50">
    <div className="container mx-auto px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Upcoming Events</h2>
      <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
      
      {events.length === 0 ? (
        // No events state - enhanced design
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8 sm:p-12 mb-8" style={{background: 'rgba(16, 25, 40, 0.6)'}}>
            <div className="mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-500/20">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                Something Amazing is Coming Soon!
              </h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
                We're crafting an incredible experience for you. Our next event will be worth the wait, 
                filled with innovation, learning, and networking opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#past-events" 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    const el = document.querySelector('#past-events');
                    if (el) {
                      const header = document.querySelector('header');
                      const headerHeight = header ? header.offsetHeight : 0;
                      const elementTop = el.getBoundingClientRect().top + window.scrollY;
                      const scrollTo = elementTop - headerHeight - 8;
                      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
                    }
                  }}
                >
                  View Past Events
                </a>
                <a 
                  href="https://instagram.com/ieee.vsit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Follow for Updates
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">
            Stay connected with us on social media to be the first to know about our upcoming events!
          </p>
        </div>
      ) : (
        // Single event display - centered and prominent
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            {events.map(event => (
              <div
                key={event.title}
                className="glass-card rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full aspect-[3/2] object-contain bg-gray-900"
                />
                <div className="p-6 sm:p-8">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold rounded-full mb-3">
                    {event.type}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    {event.desc}
                  </p>
                  <a
                    href={lumaLinks[event.title]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg transition-all duration-300 text-center text-base sm:text-lg tracking-wide ring-1 ring-blue-400/30 hover:ring-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105"
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
        </div>
      )}
    </div>
  </section>
);

export default EventsSection;