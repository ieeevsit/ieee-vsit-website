import React, { useState } from 'react';

interface PastEvent {
  year: number;
  date: string;
  title: string;
  desc: string;
  img: string;
}

interface YearTab {
  label: string;
  value: number;
}

const PastEventsSection: React.FC = () => {
    // Add a year property to each event
    const pastEvents: PastEvent[] = [
        { year: 2025, date: "MARCH 2025", title: "Robotics & Automation", desc: "Hands-on workshop on building and programming autonomous robots.", img: "Robotics+Workshop" },
        { year: 2025, date: "JANUARY 2025", title: "Cyberthon '25", desc: "A 12-hour hackathon focused on ethical hacking and cybersecurity challenges.", img: "Cyberthon" },
        { year: 2024, date: "NOVEMBER 2024", title: "Full-Stack Web Dev Series", desc: "A multi-part series covering everything from React to Node.js.", img: "Web+Dev+Series" },
        { year: 2024, date: "SEPTEMBER 2024", title: "Tech Talk: Life at Google", desc: "An inspiring session with a Google software engineer on tech careers.", img: "Tech+Talk" },
    ];

    // Tabs for years
    const yearTabs: YearTab[] = [
        { label: "2025", value: 2025 },
        { label: "2024", value: 2024 },
    ];

    // Default to latest year
    const [activeYear, setActiveYear] = useState<number>(yearTabs[0].value);

    // Filter events by year
    const filteredEvents = pastEvents.filter(ev => ev.year === activeYear);

    return (
        <section id="past-events" className="py-14 sm:py-20 bg-gray-900/50">
            <div className="container mx-auto px-2 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Event Rewind</h2>
                <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
                <p className="text-center max-w-3xl mx-auto text-gray-300 mb-8 sm:mb-12">
                    We believe in learning by doing. Our past events have empowered students with new skills, sparked innovative ideas, and created lasting connections. Here's a glimpse of the action.
                </p>
                {/* Year Tabs */}
                <div className="flex flex-col gap-3 items-stretch max-w-xs mx-auto mb-10 sm:flex-row sm:justify-center sm:gap-0 sm:max-w-none">
                    {yearTabs.map(tab => (
                        <button
                            key={tab.value}
                            className={`w-full sm:w-auto px-6 py-2 rounded-full font-semibold transition-colors duration-200
                                ${activeYear === tab.value
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
                                ${activeYear === tab.value ? "" : "sm:mx-2"}
                                `}
                            style={{
                                borderRadius: '9999px',
                                marginBottom: '0px'
                            }}
                            onClick={() => setActiveYear(tab.value)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {/* Responsive grid for mobile, flex-row for larger screens */}
                <div className="grid grid-cols-1 gap-y-14 gap-x-0 sm:gap-y-8 sm:gap-x-6 sm:grid-cols-2 lg:flex lg:flex-row lg:space-x-8 pb-6 sm:pb-8">
                    {filteredEvents.map(event => (
                        <div key={event.title} className="w-full glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 min-w-0 sm:w-80 flex-shrink-0">
                            <img src={`https://placehold.co/600x400/1f2937/ffffff?text=${event.img}`} alt={event.title} className="w-full h-36 sm:h-40 object-cover"/>
                            <div className="p-4 sm:p-6">
                                <p className="text-xs text-blue-400">{event.date}</p>
                                <h3 className="text-base sm:text-lg font-bold mt-1">{event.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-400 mt-2">{event.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PastEventsSection;