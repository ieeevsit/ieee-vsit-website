import React, { useState } from 'react';
import Link from 'next/link';
import { getAvailableYears, getLimitedEventsByYear } from '@/lib/data/events';

interface YearTab {
  label: string;
  value: number;
}

const PastEventsSection: React.FC = () => {
    // Get available years dynamically
    const availableYears = getAvailableYears();
    
    // Tabs for years
    const yearTabs: YearTab[] = availableYears.map(year => ({
        label: year.toString(),
        value: year
    }));

    // Default to latest year
    const [activeYear, setActiveYear] = useState<number>(yearTabs[0]?.value || new Date().getFullYear());

    // Get limited events for the active year
    const { mobile: mobileEvents, desktop: desktopEvents, hasMore } = getLimitedEventsByYear(activeYear);

    return (
        <section id="past-events" className="py-14 sm:py-20 bg-[#0A0F1A]">
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

                {/* Mobile Events (2 events) */}
                <div className="block sm:hidden">
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        {mobileEvents.map(event => (
                            <Link 
                                key={event.id} 
                                href={`/events/${event.year}/${event.slug}`}
                                className="block w-full"
                            >
                                <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2">
                                    <img 
                                        src={event.image.startsWith('/') ? event.image : `https://placehold.co/600x400/1f2937/ffffff?text=${encodeURIComponent(event.image)}`}
                                        alt={event.title} 
                                        className="w-full h-64 sm:h-72 object-cover object-center"
                                    />
                                    <div className="p-4">
                                        <p className="text-xs text-blue-400 mb-1">{event.date}</p>
                                        <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-3">{event.shortDescription}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {hasMore && (
                        <div className="text-center">
                            <Link 
                                href={`/events/${activeYear}`}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                View More Events
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Desktop Events (4 events) */}
                <div className="hidden sm:block">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {desktopEvents.map(event => (
                            <Link 
                                key={event.id} 
                                href={`/events/${event.year}/${event.slug}`}
                                className="block w-full"
                            >
                                <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 h-full">
                                    <img 
                                        src={event.image.startsWith('/') ? event.image : `https://placehold.co/600x400/1f2937/ffffff?text=${encodeURIComponent(event.image)}`}
                                        alt={event.title} 
                                        className="w-full h-48 sm:h-56 object-cover object-center"
                                    />
                                    <div className="p-4 flex flex-col h-full">
                                        <p className="text-xs text-blue-400 mb-1">{event.date}</p>
                                        <h3 className="text-base font-bold mb-2 line-clamp-2 flex-grow-0">{event.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-3 flex-grow">{event.shortDescription}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {hasMore && (
                        <div className="text-center">
                            <Link 
                                href={`/events/${activeYear}`}
                                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                View More Events
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PastEventsSection;