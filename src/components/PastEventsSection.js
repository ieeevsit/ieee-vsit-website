import React from 'react';
import { ArrowRight } from 'lucide-react';

const PastEventsSection = () => {
    const pastEvents = [
        { date: "MARCH 2025", title: "Robotics & Automation", desc: "Hands-on workshop on building and programming autonomous robots.", img: "Robotics+Workshop" },
        { date: "JANUARY 2025", title: "Cyberthon '25", desc: "A 12-hour hackathon focused on ethical hacking and cybersecurity challenges.", img: "Cyberthon" },
        { date: "NOVEMBER 2024", title: "Full-Stack Web Dev Series", desc: "A multi-part series covering everything from React to Node.js.", img: "Web+Dev+Series" },
        { date: "SEPTEMBER 2024", title: "Tech Talk: Life at Google", desc: "An inspiring session with a Google software engineer on tech careers.", img: "Tech+Talk" },
    ];

    return (
        <section id="past-events" className="py-14 sm:py-20 bg-gray-900/50">
            <div className="container mx-auto px-2 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Event Rewind</h2>
                <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
                <p className="text-center max-w-3xl mx-auto text-gray-300 mb-8 sm:mb-12">
                    We believe in learning by doing. Our past events have empowered students with new skills, sparked innovative ideas, and created lasting connections. Here's a glimpse of the action.
                </p>
                {/* Responsive grid for mobile, flex-row for larger screens */}
                <div className="grid grid-cols-1 gap-y-14 gap-x-0 sm:gap-y-8 sm:gap-x-6 sm:grid-cols-2 lg:flex lg:flex-row lg:space-x-8 pb-6 sm:pb-8">
                    {pastEvents.map(event => (
                        <div key={event.title} className="w-full glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 min-w-0 sm:w-80 flex-shrink-0">
                            <img src={`https://placehold.co/600x400/1f2937/ffffff?text=${event.img}`} alt={event.title} className="w-full h-36 sm:h-40 object-cover"/>
                            <div className="p-4 sm:p-6">
                                <p className="text-xs text-blue-400">{event.date}</p>
                                <h3 className="text-base sm:text-lg font-bold mt-1">{event.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-400 mt-2">{event.desc}</p>
                            </div>
                        </div>
                    ))}
                    <div className="w-full glass-card rounded-xl flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-blue-900/20 border-blue-500/50 min-w-0 sm:w-80 flex-shrink-0">
                        <h3 className="text-lg sm:text-2xl font-bold">Be Part of the Next Big Thing</h3>
                        <p className="text-gray-300 mt-3 mb-4 sm:mt-4 sm:mb-6 text-sm sm:text-base">Don't miss out on our upcoming events. Join the largest technical community on campus.</p>
                        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-300 flex items-center group text-sm sm:text-base">
                            Join IEEE Today <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PastEventsSection;
