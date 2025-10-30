import React from 'react';
import Link from 'next/link';
import { getEventBySlugAndYear, getEventsByYear, getAvailableYears } from '@/lib/data/events';
import { getEventMarkdownContent } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import PageLayout from '@/components/PageLayout';

interface Props {
  params: Promise<{
    year: string;
    slug: string;
  }>;
}

// Generate static params for all available events
export async function generateStaticParams() {
  const years = getAvailableYears();
  const paths: Array<{ year: string; slug: string }> = [];
  
  years.forEach(year => {
    const events = getEventsByYear(year);
    events.forEach(event => {
      paths.push({
        year: year.toString(),
        slug: event.slug,
      });
    });
  });
  
  return paths;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.year);
  const event = getEventBySlugAndYear(resolvedParams.slug, year);

  if (!event) {
    return {
      title: 'Event Not Found - IEEE VSIT',
    };
  }

  return {
    title: `${event.title} - IEEE VSIT`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.year);
  const event = getEventBySlugAndYear(resolvedParams.slug, year);
  
  // Validate event exists
  if (!event) {
    notFound();
  }

  // Get related events from the same year
  const relatedEvents = getEventsByYear(year)
    .filter(e => e.id !== event.id)
    .slice(0, 3);

  // Load markdown content from file
  const markdownContent = await getEventMarkdownContent(event.id);

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#0A0F1A] pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/events/${event.year}`} className="hover:text-blue-400 transition-colors">
            Events {event.year}
          </Link>
          <span>/</span>
          <span className="text-white">{event.title}</span>
        </nav>

        {/* Event Header */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-12">
            {/* Event Image */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={`https://placehold.co/800x600/1f2937/ffffff?text=${encodeURIComponent(event.image)}`} 
                  alt={event.title} 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured Event
                  </div>
                )}
                {event.category && (
                  <div className="absolute top-4 left-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm capitalize">
                    {event.category}
                  </div>
                )}
              </div>
            </div>

            {/* Event Info */}
            <div className="lg:w-1/2">
              <p className="text-blue-400 font-medium mb-2">{event.date}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {event.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {event.description}
              </p>

              {/* Event Meta */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Year: {event.year}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300 capitalize">Category: {event.category || 'General'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Organized by IEEE VSIT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-6 sm:p-8 lg:p-12 mb-12">
            <div className="prose prose-invert prose-blue max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8 text-white">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6 text-white">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 text-gray-300 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 text-gray-300 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="ml-4">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">
              More Events from {event.year}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.year}/${relatedEvent.slug}`}
                  className="block group"
                >
                  <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2">
                    <img 
                      src={`https://placehold.co/600x400/1f2937/ffffff?text=${encodeURIComponent(relatedEvent.image)}`} 
                      alt={relatedEvent.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs text-blue-400 mb-2">{relatedEvent.date}</p>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {relatedEvent.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {relatedEvent.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <Link
            href={`/events/${event.year}`}
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {event.year} Events
          </Link>
          
          <Link
            href="/#past-events"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Home
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      </div>
    </PageLayout>
  );
}