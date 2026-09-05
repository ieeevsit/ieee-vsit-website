// ---------------------------------------------------------------------------
// Event data model
// ---------------------------------------------------------------------------
// This file is the single source of truth for every event on the website.
//
// To add a new event, add one object to the `eventsData` array below (or, for
// upcoming events with a registration link, follow the step-by-step guide in
// EVENTS_GUIDE.md at the repository root). You should not need to touch any
// other file to publish a normal event.
// ---------------------------------------------------------------------------

export type RegistrationPlatform = "luma";

/**
 * Registration information for an event. This block is entirely optional —
 * omit it (or set `enabled: false`) for events that don't take registrations.
 */
export interface EventRegistration {
  /** Set to true to show a "Register Now" button on the event. */
  enabled: boolean;
  /** Only "luma" is supported today. */
  platform?: RegistrationPlatform;
  /**
   * The public Luma event page URL, e.g. "https://lu.ma/abc123xyz".
   * Required whenever `enabled` is true — this is what visitors are sent to
   * if the embedded checkout can't load, and it's also copied straight from
   * your event's Luma page.
   */
  url?: string;
  /**
   * The internal Luma event ID, e.g. "evt-AbCdEfGhIjKlMnOp".
   * Optional, but required to open Luma's embedded checkout overlay on this
   * site instead of sending visitors to lu.ma. Find it on your event's
   * Manage page → "More" tab → "Embed Registration Button".
   */
  eventId?: string;
  /**
   * Optional ISO date/time (e.g. "2026-09-20T23:59:00") after which the
   * button will read "Registration Closed" instead of "Register Now".
   */
  closesAt?: string;
}

export interface EventData {
  id: string;
  slug: string;
  year: number;
  /** Display date shown on cards/pages, e.g. "SEPTEMBER 2026" or "20 SEPT 2026". */
  date: string;
  /**
   * Optional ISO date ("YYYY-MM-DD") for this event.
   * This is what drives the Upcoming vs. Past classification: events with an
   * `eventDate` on or after today show under "Upcoming Events"; events
   * without one (or with a past `eventDate`) show under "Past Events".
   * Existing/older events intentionally don't set this and are simply
   * treated as past events.
   */
  eventDate?: string;
  /** Optional display time, e.g. "10:00 AM - 1:00 PM". */
  time?: string;
  /** Optional venue/location, e.g. "VSIT Lab X-103" or "Google Meet". */
  venue?: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  category?: string;
  featured?: boolean;
  /** Optional registration block — see EventRegistration above. */
  registration?: EventRegistration;
}

// ---------------------------------------------------------------------------
// Events data - add new events here
// ---------------------------------------------------------------------------
const rawEventsData: EventData[] = [
  // EXAMPLE_EVENT, // Example event for reference; remove this line when adding real events.
  //   {
  //   id: "membership-2026",
  //   slug: "membership-2026",
  //   year: 2026,
  //   date: "September 2026",
  //   eventDate: "2026-09-20",
  //   time: "10:00 AM - 4:00 PM",
  //   venue: "M-514",
  //   title: "Membership Drive 2026",
  //   description: "",
  //   shortDescription:
  //     "Join us for our annual membership drive and become a part of the IEEE community.",
  //   image: "/posters/ieee-membership-drive-2025.jpg",
  //   category: "membership",
  //   featured: false,
  //   registration:{
  //   enabled: true,
  //   platform: "luma",
  //   url: "https://luma.com/d018s58b",
  //   // eventId: "d018s58b",
  // },
  // },
  {
  id: "newtech-horizons-2-2026",
  slug: "newtech-horizons-2-2026",
  year: 2026,
  date: "26th August, 2026",
  title: "NewTech Horizons – Session 2",
  description:
    "Beyond the Data: Think. Code. Decode. — an interactive hands-on data exploration workshop designed to provide students with practical insights into data and its real-world applications.",
  shortDescription:
    "An interactive hands-on workshop introducing students to practical data exploration, analysis, visualization, and data-driven thinking.",
  image: "/posters/newtech-horizons-2026-poster.jpeg",
  category: "Workshop",
  featured: false,
  },
  {
    id: "cineverse-2026",
    slug: "cineverse-2026",
    year: 2026,
    date: "JULY 2026",
    title: "Cineverse 2026",
    description: "",
    shortDescription:
      "CINEVERSE was an IEEE-WIE movie screening event where over 200 students enjoyed the screening of Project Hail Mary.",
    image: "/posters/cineverse-2026-poster.jpeg",
    category: "movie screening",
    featured: false,
  },
  {
    id: "stree-2026",
    slug: "stree-2026",
    year: 2026,
    date: "MARCH 2026",
    title: "STREE 2026",
    description: "",
    shortDescription:
      "A two-day Women's Day celebration featuring an inspiring panel discussion and an engaging technical quiz competition.",
    image: "/posters/stree-2026-poster.jpg",
    category: "panel discussion",
    featured: false,
  },
  {
    id: "synapse-2026",
    slug: "synapse-2026",
    year: 2026,
    date: "FEBRUARY 2026",
    title: "Synapse",
    description: "",
    shortDescription:
      "A lively quiz-based workshop that promoted learning, competition, and marked the handover to the new committee.",
    image: "/posters/synapse-2026-poster.png",
    category: "workshop",
    featured: false,
  },
  {
    id: "new-tech-horizons",
    slug: "new-tech-horizons",
    year: 2025,
    date: "NOVEMBER 2025",
    title: "New Tech Horizons",
    description: "",
    shortDescription: "Sneak Peek Into the IT Industry: How Projects Are Built, Tested & Enhanced with AI",
    image: "/posters/new-tech-horizons.png",
    category: "seminar",
    featured: false,
  },
  {
    id: "ieee-day-2025",
    slug: "ieee-day-2025",
    year: 2025,
    date: "OCTOBER 2025",
    title: "IEEE Day 2025 Celebration",
    description:
      "A celebration of innovation and collaboration, highlighting IEEE\u2019s global mission, membership benefits, and the inspiring journeys of student leaders. The event brought together over 60 participants to connect, learn, and grow within the IEEE community.",
    shortDescription: "Celebrating IEEE\u2019s mission and community.",
    image: "/posters/ieee-day-2025.jpg",
    category: "community",
    featured: true,
  },

  {
    id: "gittopia-2025",
    slug: "gittopia",
    year: 2025,
    date: "SEPTEMBER 2025",
    title: "Gittopia",
    description:
      "An immersive hands-on workshop designed to take participants from Git basics to advanced GitHub workflows. Participants will learn version control, collaboration techniques, and industry best practices.",
    shortDescription: "Hands-on workshop on Git and GitHub.",
    image: "/posters/gittopia.jpg", // Changed to actual image path
    category: "workshop",
    featured: true,
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
    description:
      "A national-level conclave bridging academia and industry, focusing on cutting-edge advancements in AI for Cybersecurity and Data Analytics. Featured keynote, expert panel, and student project presentations with over 170 participants nationwide.",
    shortDescription: "National-level conclave on AI, Cybersecurity, and Data Analytics.",
    image: "/posters/nextedge-2025.png",
    category: "conference",
    featured: true,
  },
  {
    id: "ctrl-play-2025",
    slug: "ctrl-play",
    year: 2025,
    date: "SEPTEMBER 2025",
    title: "CTRL + PLAY: IEEE-VSIT Movie Screening",
    description:
      "An engaging movie screening event featuring the sci-fi adventure film 'Crater,' organized by IEEE VSIT and WIE. The event explored themes of friendship, exploration, and curiosity, aligning with IEEE\u2019s mission of fostering innovation and collaboration.",
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
    description:
      "A three-day celebration organized by the WIE-VSIT Student Branch, featuring mentorship sessions, inspiring talks by industry professionals, and hands-on learning experiences. Focused on empowering women in technology through connection, leadership, and skill development.",
    shortDescription:
      "Three-day celebration empowering women in technology through mentorship, leadership talks, and professional workshops.",
    image: "WIE Day Celebration", // Update this with the official WIE Day poster
    category: "empowerment",
  },

  // -------------------------------------------------------------------------
  // Copy-paste template for a new UPCOMING event with Luma registration.
  // Uncomment and fill in to publish it. See EVENTS_GUIDE.md for full steps.
  // -------------------------------------------------------------------------
  // {
  //   id: "ai-workshop-2026",
  //   slug: "ai-workshop-2026",
  //   year: 2026,
  //   date: "20 SEPTEMBER 2026",
  //   eventDate: "2026-09-20",
  //   time: "10:00 AM - 1:00 PM",
  //   venue: "VSIT Seminar Hall",
  //   title: "AI Workshop",
  //   description: "A hands-on workshop introducing students to practical AI tools and workflows.",
  //   shortDescription: "Hands-on workshop on practical AI tools.",
  //   image: "/posters/ai-workshop-2026.jpg",
  //   category: "workshop",
  //   featured: false,
  //   registration: {
  //     enabled: true,
  //     platform: "luma",
  //     url: "https://lu.ma/your-event-slug",
  //     eventId: "evt-xxxxxxxxxxxxxxxx",
  //   },
  // },
];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
// Malformed event entries are logged loudly and excluded from the site
// instead of crashing the build or silently rendering broken content.

const SUPPORTED_REGISTRATION_PLATFORMS: RegistrationPlatform[] = ["luma"];

function validateEvent(event: EventData): string[] {
  const errors: string[] = [];

  if (!event.id || !event.id.trim()) errors.push('Missing "id".');
  if (!event.slug || !event.slug.trim()) errors.push('Missing "slug".');
  if (!event.title || !event.title.trim()) errors.push('Missing "title".');
  if (!event.year || Number.isNaN(event.year)) errors.push('Missing or invalid "year".');
  if (!event.date || !event.date.trim()) errors.push('Missing "date" (the display date string).');
  if (!event.image || !event.image.trim()) errors.push('Missing "image" (event poster).');

  if (event.eventDate) {
    const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
    const parsed = new Date(`${event.eventDate}T00:00:00`);
    if (!isoPattern.test(event.eventDate) || Number.isNaN(parsed.getTime())) {
      errors.push(`Invalid "eventDate" ("${event.eventDate}"). Use ISO format YYYY-MM-DD, e.g. "2026-09-20".`);
    }
  }

  if (event.registration?.enabled) {
    const reg = event.registration;

    if (!reg.platform) {
      errors.push('"registration.enabled" is true but "registration.platform" is missing.');
    } else if (!SUPPORTED_REGISTRATION_PLATFORMS.includes(reg.platform)) {
      errors.push(
        `Unsupported "registration.platform" ("${reg.platform}"). Supported platforms: ${SUPPORTED_REGISTRATION_PLATFORMS.join(", ")}.`
      );
    }

    if (!reg.url || !/^https?:\/\//i.test(reg.url)) {
      errors.push(
        '"registration.enabled" is true but "registration.url" is missing or invalid. Add the Luma event page URL (e.g. "https://lu.ma/abc123").'
      );
    }

    if (reg.closesAt && Number.isNaN(new Date(reg.closesAt).getTime())) {
      errors.push(`Invalid "registration.closesAt" ("${reg.closesAt}"). Use an ISO date/time string.`);
    }
  }

  return errors;
}

function validateAndFilterEvents(events: EventData[]): EventData[] {
  const seenKeys = new Set<string>();
  const valid: EventData[] = [];

  for (const event of events) {
    const errors = validateEvent(event);
    const label = event.id || event.title || "(unknown event)";

    if (errors.length > 0) {
      console.error(`[events] Skipping invalid event "${label}":\n  - ${errors.join("\n  - ")}`);
      continue;
    }

    const dedupeKey = `${event.year}/${event.slug}`;
    if (seenKeys.has(dedupeKey)) {
      console.error(
        `[events] Skipping event "${label}": duplicate slug "${event.slug}" already used for year ${event.year}.`
      );
      continue;
    }

    seenKeys.add(dedupeKey);
    valid.push(event);
  }

  return valid;
}

// The validated, de-duplicated event list used everywhere else on the site.
export const eventsData: EventData[] = validateAndFilterEvents(rawEventsData);

// ---------------------------------------------------------------------------
// Upcoming vs. Past classification
// ---------------------------------------------------------------------------

/**
 * An event is "upcoming" only if it has a valid `eventDate` that is today or
 * later. Events without an `eventDate` (including all pre-existing events)
 * are treated as past events, which preserves current site behavior.
 */
export const isUpcomingEvent = (event: EventData, referenceDate: Date = new Date()): boolean => {
  if (!event.eventDate) return false;
  const eventEndOfDay = new Date(`${event.eventDate}T23:59:59`);
  if (Number.isNaN(eventEndOfDay.getTime())) return false;
  return eventEndOfDay.getTime() >= referenceDate.getTime();
};

export const isRegistrationClosed = (registration: EventRegistration | undefined, referenceDate: Date = new Date()): boolean => {
  if (!registration?.closesAt) return false;
  const closes = new Date(registration.closesAt);
  if (Number.isNaN(closes.getTime())) return false;
  return closes.getTime() < referenceDate.getTime();
};

/** All upcoming events, soonest first. */
export const getUpcomingEvents = (): EventData[] => {
  return eventsData
    .filter((event) => isUpcomingEvent(event))
    .sort((a, b) => new Date(a.eventDate as string).getTime() - new Date(b.eventDate as string).getTime());
};

/** All past events (i.e. everything that isn't upcoming). */
export const getPastEvents = (): EventData[] => {
  return eventsData.filter((event) => !isUpcomingEvent(event));
};

// ---------------------------------------------------------------------------
// Helper functions for easy data access
// ---------------------------------------------------------------------------
export const getEventsByYear = (year: number): EventData[] => {
  return eventsData.filter((event) => event.year === year);
};

export const getFeaturedEventsByYear = (year: number): EventData[] => {
  return eventsData.filter((event) => event.year === year && event.featured);
};

export const getEventBySlugAndYear = (slug: string, year: number): EventData | undefined => {
  return eventsData.find((event) => event.slug === slug && event.year === year);
};

export const getAvailableYears = (): number[] => {
  const years = [...new Set(eventsData.map((event) => event.year))];
  return years.sort((a, b) => b - a); // Most recent first
};

/**
 * Past events only, limited for the homepage "Event Rewind" section.
 * (Upcoming events for the year are shown separately, under Upcoming Events,
 * so they're intentionally excluded here to avoid showing the same event
 * twice on the homepage.)
 */
export const getLimitedEventsByYear = (year: number, mobileLimit: number = 2, desktopLimit: number = 4) => {
  const yearEvents = getEventsByYear(year).filter((event) => !isUpcomingEvent(event));
  return {
    mobile: yearEvents.slice(0, mobileLimit),
    desktop: yearEvents.slice(0, desktopLimit),
    hasMore: yearEvents.length > 0, // Always show "View More" if there are any events for the year
  };
};
