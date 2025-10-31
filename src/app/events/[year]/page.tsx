import React from 'react';
import Link from 'next/link';
import { getEventsByYear, getAvailableYears } from '@/lib/data/events';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';

interface Props {
  params: Promise<{
    year: string;
  }>;
}

// Generate static params for all available years
export async function generateStaticParams() {
  const years = getAvailableYears();
  return years.map((year) => ({
    year: year.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.year);
  if (isNaN(year)) {
    return {
      title: 'Events Not Found - IEEE VSIT',
    };
  }

  return {
    title: `Events ${year} - IEEE VSIT`,
    description: `Explore all IEEE VSIT events from ${year}. Workshops, talks, competitions, and more.`,
  };
}

export default async function YearlyEventsPage({ params }: Props) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.year);
  
  // Validate year
  if (isNaN(year) || !getAvailableYears().includes(year)) {
    notFound();
  }

  const events = getEventsByYear(year);
  const availableYears = getAvailableYears();

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#0A0F1A] pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Events {year}
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover all the amazing events we organized in {year}. From workshops to competitions, 
            each event was designed to inspire and empower our community.
          </p>
        </div>

        {/* Year Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {availableYears.map((availableYear) => (
            <Link
              key={availableYear}
              href={`/events/${availableYear}`}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                year === availableYear
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {availableYear}
            </Link>
          ))}
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.year}/${event.slug}`}
                className="block group"
              >
                <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 h-full">
                  {/* Event Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image.startsWith('/') ? event.image : `https://placehold.co/600x400/1f2937/ffffff?text=${encodeURIComponent(event.image)}`}
                      alt={event.title} 
                      className="w-full h-64 sm:h-72 lg:h-80 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    {event.featured && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    {event.category && (
                      <div className="absolute top-3 left-3 bg-gray-900/80 text-white px-2 py-1 rounded-full text-xs capitalize">
                        {event.category}
                      </div>
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="p-5">
                    <p className="text-xs text-blue-400 mb-2 font-medium">{event.date}</p>
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                      {event.shortDescription}
                    </p>
                  </div>

                  {/* Read More Arrow */}
                  <div className="px-5 pb-5">
                    <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      Read More
                      <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-300">No Events Found</h3>
            <p className="text-gray-400 mb-8">
              We don't have any events recorded for {year} yet.
            </p>
            <Link
              href="/#past-events"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              View Other Years
            </Link>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/#past-events"
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      </div>
    </PageLayout>
  );
}