# Events Management System

This guide explains how to easily add and manage events in the IEEE VSIT website.

## Quick Start: Adding a New Event

### 1. Add Event Data
Edit `/src/lib/data/events.ts` and add your event to the `eventsData` array:

```typescript
{
  id: "event-name-2025",
  slug: "event-name",
  year: 2025,
  date: "MONTH YEAR",
  title: "Event Title",
  description: "Detailed description of the event for the individual event page",
  shortDescription: "Brief description for cards and listings",
  image: "event-image-name",
  category: "workshop", // workshop, competition, talk, etc.
  featured: true // Optional: shows "Featured" badge
}
```

### 2. Create Markdown Content
Create a new file `/content/events/event-name-2025.md` with your event content:

```markdown
# Event Title

## About the Event
Write about what the event was about...

## What We Covered
- Point 1
- Point 2

## Event Highlights
- Statistic 1
- Statistic 2

## Feedback
> "Quote from participant" - Participant Name
```

### 3. That's It!
The event will automatically appear in:
- Past Events section (showing 2 on mobile, 4 on desktop)
- `/events-YEAR` page (showing all events for that year)
- `/events-YEAR/event-slug` page (individual event page)

## Directory Structure

```
src/
├── lib/
│   ├── data/
│   │   └── events.ts          # Event metadata
│   └── markdown.ts            # Markdown loading utilities
├── app/
│   ├── events-[year]/
│   │   ├── page.tsx           # Yearly events listing
│   │   └── [slug]/
│   │       └── page.tsx       # Individual event page
│   └── ...
├── components/
│   └── PastEventsSection.tsx  # Homepage events section
└── ...

content/
└── events/
    ├── event-id-2025.md       # Event content in markdown
    └── ...
```

## Features

### Responsive Design
- **Mobile**: Shows 2 events per year with "View More" button
- **Desktop**: Shows 4 events per year with "View More" button
- **Text Overflow**: Automatically handled with line clamping

### SEO Optimized
- Dynamic meta titles and descriptions
- Structured URLs (`/events-2025/event-name`)
- Static generation for fast loading

### Easy Management
- Add events by editing one file
- Markdown content for rich formatting
- Automatic URL generation
- Year-based organization

### Navigation
- Breadcrumb navigation
- Related events suggestions
- Back to home/year links
- Year tabs for easy browsing

## Event Categories

Use these categories for consistency:
- `workshop` - Hands-on learning sessions
- `competition` - Hackathons, contests
- `talk` - Lectures, presentations
- `entertainment` - Movie nights, games
- `bootcamp` - Intensive training
- `summit` - Large conferences
- `expo` - Exhibitions, showcases

## Markdown Features

Your markdown content supports:
- Headers (H1, H2, H3)
- Lists (ordered and unordered)
- **Bold** and *italic* text
- Links
- Blockquotes for testimonials
- Code blocks (if needed)

## File Naming Convention

- Event IDs: `event-name-year` (e.g., `gittopia-2025`)
- Slugs: `event-name` (used in URLs)
- Markdown files: `event-id.md` (e.g., `gittopia-2025.md`)

## Images

Currently using placeholder images. To add real images:
1. Add images to `/public/events/`
2. Update the image references in components
3. Use the `image` field in event data to specify filename

## Best Practices

### Event Descriptions
- **Short Description**: 1-2 sentences for cards
- **Description**: 1-2 paragraphs for event pages
- **Markdown Content**: Detailed information, testimonials, statistics

### Content Structure
1. Start with event overview
2. Include what was covered/learned
3. Add statistics and highlights
4. Include participant feedback
5. Mention resources/follow-up

### SEO Tips
- Use descriptive titles
- Include relevant keywords naturally
- Add alt text for images
- Use proper heading hierarchy

## Troubleshooting

### Event Not Showing
1. Check event data is in `events.ts`
2. Verify year is in `getAvailableYears()`
3. Ensure slug matches URL

### Markdown Not Loading
1. Check file exists in `/content/events/`
2. Verify filename matches event ID
3. Check markdown syntax

### 404 Errors on Event Pages
1. **Next.js 15 Compatibility**: Ensure `params` is awaited in dynamic routes
2. **Development Server**: Try restarting the dev server with `npm run dev`
3. **Static Generation**: Check `generateStaticParams` returns correct paths
4. **URL Format**: Ensure URLs follow `/events-YEAR/slug` format

### Common Development Issues
1. **Params Error**: If you see "params should be awaited", ensure all dynamic route handlers use `await params`
2. **404 in Development**: Sometimes hot reload doesn't pick up new dynamic routes - restart the dev server
3. **Build Errors**: Run `npm run build` to check for build-time errors

### Styling Issues
1. Text overflow: Check line-clamp classes
2. Mobile responsive: Test on different screen sizes
3. Images: Verify placeholder URLs

### Next.js 15 Updates
This codebase is compatible with Next.js 15. Key changes made:
- All `params` objects are awaited before use
- Metadata generation properly handles async params
- Static generation works with new async patterns

## Contributing

When adding events:
1. Follow the existing data structure
2. Use consistent naming conventions
3. Write comprehensive markdown content
4. Test on both mobile and desktop
5. Verify all links work correctly

## Future Enhancements

Planned improvements:
- Real image upload system
- Event registration integration
- Photo galleries
- Event calendar view
- Search and filtering
- Event tags and categories