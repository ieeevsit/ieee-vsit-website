export interface EventData {
  id: string;
  slug: string;
  year: number;
  date: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  category?: string;
  featured?: boolean;
}

// Events data - easy to add new events here
export const eventsData: EventData[] = [
  {
    id: "gittopia-2025",
    slug: "gittopia",
    year: 2025,
    date: "SEPTEMBER 2025",
    title: "Gittopia",
    description: "An immersive hands-on workshop designed to take participants from Git basics to advanced GitHub workflows. Participants will learn version control, collaboration techniques, and industry best practices.",
    shortDescription: "Hands-on workshop on Git and GitHub.",
    image: "/posters/gittopia.jpg", // Changed to actual image path
    category: "workshop",
    featured: true
  },

{
  id: "ieee-day-2025",
  slug: "ieee-day",
  year: 2025,
  date: "OCTOBER 2025",
  title: "IEEE Day 2025 Celebration",
  description: "A celebration of innovation and collaboration, highlighting IEEE’s global mission, membership benefits, and the inspiring journeys of student leaders. The event brought together over 60 participants to connect, learn, and grow within the IEEE community.",
  shortDescription: "Celebrating IEEE’s mission and community.",
  image: "/posters/ieee-day-2025.jpg",
  category: "community",
  featured: true
},
{
  id: "ieee-membership-drive-2025",
  slug: "ieee-membership-drive",
  year: 2025,
  date: "SEPTEMBER 2025",
  title: "IEEE Membership Drive 2025-26",
  description:
    "A week-long initiative introducing students to the benefits of joining IEEE and the Women in Engineering (WIE) group. Featured live demonstrations, Q&A sessions, and new member registrations to encourage active participation.",
  shortDescription: "Week-long campaign promoting IEEE and WIE memberships.",
  image: "/posters/ieee-membership-drive-2025.jpg",
  category: "informative",
},
{
  id: "nextedge-2025",
  slug: "nextedge",
  year: 2025,
  date: "AUGUST 2025",
  title: "NextEdge: National Level Conclave",
  description: "A national-level conclave bridging academia and industry, focusing on cutting-edge advancements in AI for Cybersecurity and Data Analytics. Featured keynote, expert panel, and student project presentations with over 170 participants nationwide.",
  shortDescription: "National-level conclave on AI, Cybersecurity, and Data Analytics.",
  image: "/posters/nextedge-2025.png",
  category: "conference",
  featured: true
},
{
  id: "ctrl-play-2025",
  slug: "ctrl-play",
  year: 2025,
  date: "SEPTEMBER 2025",
  title: "CTRL + PLAY: IEEE-VSIT Movie Screening",
  description: "An engaging movie screening event featuring the sci-fi adventure film 'Crater,' organized by IEEE VSIT and WIE. The event explored themes of friendship, exploration, and curiosity, aligning with IEEE’s mission of fostering innovation and collaboration.",
  shortDescription: "Sci-fi movie screening and discussion event.",
  image: "/posters/ctrl-play.png", // Update this when the CTRL + PLAY poster is ready
  category: "entertainment",
},
{
  id: "wie-day-2025",
  slug: "wie-day",
  year: 2025,
  date: "JULY 2025",
  title: "WIE Day 2025: Roots and Reach | Voice Her | NextWave",
  description: "A three-day celebration organized by the WIE-VSIT Student Branch, featuring mentorship sessions, inspiring talks by industry professionals, and hands-on learning experiences. Focused on empowering women in technology through connection, leadership, and skill development.",
  shortDescription: "Three-day celebration empowering women in technology through mentorship, leadership talks, and professional workshops.",
  image: "WIE Day Celebration", // Update this with the official WIE Day poster
  category: "empowerment",
},


];

// Helper functions for easy data access
export const getEventsByYear = (year: number): EventData[] => {
  return eventsData.filter(event => event.year === year);
};

export const getFeaturedEventsByYear = (year: number): EventData[] => {
  return eventsData.filter(event => event.year === year && event.featured);
};

export const getEventBySlugAndYear = (slug: string, year: number): EventData | undefined => {
  return eventsData.find(event => event.slug === slug && event.year === year);
};

export const getAvailableYears = (): number[] => {
  const years = [...new Set(eventsData.map(event => event.year))];
  return years.sort((a, b) => b - a); // Most recent first
};

export const getLimitedEventsByYear = (year: number, mobileLimit: number = 2, desktopLimit: number = 4) => {
  const yearEvents = getEventsByYear(year);
  return {
    mobile: yearEvents.slice(0, mobileLimit),
    desktop: yearEvents.slice(0, desktopLimit),
    hasMore: yearEvents.length > 0 // Always show "View More" if there are any events for the year
  };
};