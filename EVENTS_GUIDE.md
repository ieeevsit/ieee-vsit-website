# Events Management Guide

This guide explains how to add, update, and register events on the IEEE VSIT
website. **You do not need to know React, Next.js, or any programming to do
this.** You only ever need to edit one data file (plain text, in the format
shown below), drop in a poster image, and optionally paste in a Luma link.

---

## How the events system works (read this once)

- All events live in **one file**: `src/lib/data/events.ts`. Each event is a
  block of fields (title, date, poster, description, etc.).
- Every event's poster image lives in **`public/posters/`**.
- Every event's long write-up (used on its own page) lives in
  **`content/events/<event-id>.md`** and is optional — if you skip it, the
  page shows a friendly "content coming soon" message instead of breaking.
- **Upcoming vs. Past is automatic.** If you give an event a real date in the
  `eventDate` field, the site checks that date against today:
  - Date is today or in the future → shows under **Upcoming Events** on the
    homepage, with a "Register Now" button if registration is enabled.
  - Date is in the past (or you leave `eventDate` out) → shows under
    **Past Events** / **Event Rewind**.

  You never have to move an event between sections by hand.
- **Registration is optional and powered by Luma.** IEEE-VSIT never stores
  attendee data, tickets, or payments — Luma handles all of that. The website
  only shows the "Register Now" button and opens Luma's registration
  experience on top of the page (no page navigation).
- If something in an event is missing or wrong (like a missing title or a
  broken registration link), the website automatically skips that event and
  logs a clear error instead of breaking the whole site. See
  [Troubleshooting](#troubleshooting) below.

---

## Adding an event — step by step

### 1. Add the poster image

Drop the poster file into:

```
public/posters/your-event-slug.jpg
```

Use a short, URL-safe file name (lowercase, hyphens, no spaces), e.g.
`ai-workshop-2026.jpg`. JPG or PNG both work.

### 2. Open the event data file

Open `src/lib/data/events.ts` in the repository. Scroll to the
`rawEventsData` list — it's a list of `{ ... }` blocks, one per event.

### 3. Copy the template and fill it in

At the bottom of the list there's a commented-out template you can copy.
Paste a new block like this **above** the closing `];` of the list:

```ts
{
  id: "ai-workshop-2026",
  slug: "ai-workshop-2026",
  year: 2026,
  date: "20 SEPTEMBER 2026",       // shown on the site (any readable format)
  eventDate: "2026-09-20",         // YYYY-MM-DD — this drives Upcoming/Past
  time: "10:00 AM - 1:00 PM",      // optional
  venue: "VSIT Seminar Hall",      // optional
  title: "AI Workshop",
  description: "A hands-on workshop introducing students to practical AI tools and workflows.",
  shortDescription: "Hands-on workshop on practical AI tools.",
  image: "/posters/ai-workshop-2026.jpg",
  category: "workshop",
  featured: false,
  registration: {
    enabled: true,
    platform: "luma",
    url: "https://lu.ma/your-event-slug",
    eventId: "evt-xxxxxxxxxxxxxxxx",
  },
},
```

**Required fields:** `id`, `slug`, `year`, `date`, `title`, `image`.
Everything else is optional.

- `id` and `slug` — use the same lowercase-hyphenated text (e.g.
  `ai-workshop-2026`). `id` must be unique across all events; `slug` must be
  unique within the same `year`.
- `eventDate` — only add this for events that have a specific day. Leave it
  out for events you're only adding after the fact (e.g. old events); they'll
  correctly show as Past.

### 4. Set up registration on Luma (if this event needs it)

If the event does **not** need registration, either remove the whole
`registration: { ... }` block, or set:

```ts
registration: { enabled: false },
```

If it **does** need registration:

1. Create the event on [lu.ma](https://lu.ma) as usual (it's free).
2. Copy the **event page URL** shown in your browser, e.g.
   `https://lu.ma/abc123xyz`. Paste it into `registration.url`.
3. For the "Register Now" button to open registration right on the
   IEEE-VSIT website (instead of sending people to lu.ma), go to your event's
   **Manage** page on Luma → **More** tab → **"Embed Registration Button"**.
   Copy the **event ID** shown there (it looks like `evt-AbCdEfGh...`) and
   paste it into `registration.eventId`.
   - If you skip `eventId`, the button still works — it just sends visitors
     straight to your Luma page instead of opening the embedded checkout.
4. Optional: add `closesAt: "2026-09-19T23:59:00"` (ISO date/time) if you
   want the button to automatically switch to "Registration Closed" after a
   certain moment (e.g. the night before the event).

Luma remains fully responsible for registration, ticketing, capacity,
registration questions, confirmations, and payment (if any). The website only
provides the entry point.

### 5. Add the event's write-up (optional)

Create `content/events/ai-workshop-2026.md` (filename = `id` + `.md`) with
whatever you want on the event's own page — Markdown headings, bullet lists,
bold text, quotes, links, etc. If you skip this step, the page still works
and shows a "content coming soon" message.

### 6. Push to GitHub

Commit and push your changes (the poster, the `events.ts` edit, and the
markdown file if you added one). Once deployed, the event automatically
appears:

- On the homepage, under **Upcoming Events** (if `eventDate` is today or
  later and it wasn't already there) or under **Event Rewind** (if it's in
  the past).
- On `/events/<year>` — the full list of events for that year.
- On `/events/<year>/<slug>` — the event's own page.

You don't need to edit any other file for a normal event.

---

## Copy-paste-ready example

**An upcoming event with registration:**

```ts
{
  id: "hackverse-2026",
  slug: "hackverse-2026",
  year: 2026,
  date: "5 OCTOBER 2026",
  eventDate: "2026-10-05",
  time: "9:00 AM - 6:00 PM",
  venue: "VSIT Main Auditorium",
  title: "Hackverse 2026",
  description: "A 9-hour campus hackathon for teams of 2-4 building projects around open themes, with mentorship and prizes.",
  shortDescription: "A one-day campus hackathon with mentorship and prizes.",
  image: "/posters/hackverse-2026.jpg",
  category: "competition",
  featured: true,
  registration: {
    enabled: true,
    platform: "luma",
    url: "https://lu.ma/hackverse2026",
    eventId: "evt-AbCdEfGhIjKlMnOp",
    closesAt: "2026-10-04T23:59:00",
  },
},
```

**An upcoming event with no registration:**

```ts
{
  id: "open-mic-2026",
  slug: "open-mic-2026",
  year: 2026,
  date: "12 OCTOBER 2026",
  eventDate: "2026-10-12",
  time: "5:00 PM",
  venue: "VSIT Amphitheatre",
  title: "IEEE Open Mic Night",
  description: "An informal evening of talks, music, and games — walk in, no registration needed.",
  shortDescription: "An informal evening of talks, music, and games.",
  image: "/posters/open-mic-2026.jpg",
  category: "entertainment",
  registration: { enabled: false },
},
```

---

## How to test locally before publishing

1. Install dependencies once: `npm install`
2. Start the local site: `npm run dev`
3. Open `http://localhost:3000` in your browser.
4. Check:
   - The event appears under **Upcoming Events** (if `eventDate` is today or
     later) or under **Event Rewind** (if it's in the past).
   - The poster image loads correctly.
   - Title, date, time, and venue look right.
   - If registration is enabled, **Register Now** appears and opens Luma's
     registration when clicked. If `closesAt` has passed, it should read
     **Registration Closed** instead.
   - If registration is disabled, no button appears at all.
   - Resize your browser (or use your browser's device toolbar) to check
     mobile and tablet layouts.
5. Stop the dev server (Ctrl+C) once you're happy, and push your changes.

---

## Troubleshooting

### My event isn't showing up
Open your browser's dev tools console (or check the terminal running
`npm run dev`) for a message starting with `[events] Skipping invalid
event...` — it will tell you exactly what's missing (e.g. a missing title,
poster, or date). Fix that field and refresh.

### The "Register Now" button doesn't appear
- Make sure `registration.enabled` is `true`.
- Make sure `registration.platform` is exactly `"luma"`.
- Make sure `registration.url` is a full link starting with `https://`.

### The button says "Registration Closed" but shouldn't
Check `registration.closesAt` — it must be in the future, in ISO format
(e.g. `"2026-10-04T23:59:00"`).

### My event shows under the wrong section (Upcoming/Past)
Check `eventDate`. It must be `YYYY-MM-DD` format. If it's missing, the event
is always treated as past.

### Clicking Register opens lu.ma instead of registering on-site
This happens when `registration.eventId` is missing, or when Luma's embed
script fails to load (e.g. an ad blocker). This is expected, graceful
fallback behavior — the visitor still lands on your Luma registration page
and can register there.

---

## File map (for reference)

```
public/
└── posters/
    └── <slug>.jpg                     # Event poster images

content/
└── events/
    └── <event-id>.md                  # Optional long-form write-up per event

src/
├── lib/
│   └── data/
│       └── events.ts                  # ⭐ The one file you edit for every event
├── components/
│   ├── EventsSection.tsx              # Homepage "Upcoming Events" (data-driven)
│   ├── PastEventsSection.tsx          # Homepage "Event Rewind" (data-driven)
│   └── LumaRegisterButton.tsx         # Shared "Register Now" / "Registration Closed" button
└── app/
    └── events/
        └── [year]/
            ├── page.tsx               # Yearly events listing
            └── [slug]/page.tsx        # Individual event page
```

## Event categories

Use these for consistency (any short lowercase word works):
`workshop`, `competition`, `talk`, `entertainment`, `bootcamp`, `summit`,
`expo`, `panel discussion`, `seminar`, `community`, `informative`,
`conference`, `empowerment`.
