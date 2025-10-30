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
    date: "OCTOBER 2025",
    title: "Gittopia",
    description: "An immersive hands-on workshop designed to take participants from Git basics to advanced GitHub workflows. Participants will learn version control, collaboration techniques, and industry best practices.",
    shortDescription: "Hands-on workshop on Git and GitHub.",
    image: "gittopia",
    category: "workshop",
    featured: true
  },
  {
    id: "ctrl-play-2025",
    slug: "ctrl-play",
    year: 2025,
    date: "AUGUST 2025",
    title: "Ctrl + Play",
    description: "A unique movie screening event that combines entertainment with technology insights. Features tech-themed movies followed by discussions on their real-world applications.",
    shortDescription: "Movie screening event.",
    image: "ctrl-play",
    category: "entertainment",
    featured: true
  },
  {
    id: "wie-day-celebration",
    slug: "workshop",
    year: 2025,
    date: "JULY 2025",
    title: "WIE Day Celebrations",
    description: "3 Day Event Conducted.",
    shortDescription: "Industry expert talks.",
    image: "wie day",
    category: "talk",
    featured: true
  },
  {
    id: "unity-workshop-2024",
    slug: "unity-workshop",
    year: 2024,
    date: "SEPTEMBER 2024",
    title: "Unity Workshop",
    description: "Comprehensive game development workshop using Unity engine. Participants learned 2D and 3D game development, scripting, and publishing workflows.",
    shortDescription: "Hands-on Unity Workshop.",
    image: "unity",
    category: "workshop",
    featured: true
  },
  {
    id: "symposium-2024",
    slug: "symposium",
    year: 2024,
    date: "AUGUST 2024",
    title: "Symposium",
    description: "A comprehensive summit on Artificial Intelligence featuring workshops, talks, and hands-on sessions on machine learning and deep learning.",
    shortDescription: "AI and ML focused summit.",
    image: "symposium",
    category: "summit",
    featured: true
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