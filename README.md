
# IEEE-VSIT Website

This is the official website for the IEEE-VSIT student chapter, built with Next.js, Tailwind CSS, and React Three Fiber for 3D effects.

## Features
- Modern, responsive design
- 3D hero section with interactive shapes
- Sections for About, Events, Domains, Team, and AI-powered Q&A
- Built with Next.js App Router and Tailwind CSS

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your configuration:
   - `NEXT_PUBLIC_CERTIFICATE_API_URL`: URL for certificate generation API
   - `ATTENDEES_DATA`: JSON string containing attendee data for certificate generation

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/components/` — All React components
- `src/components/3d/` — 3D components using @react-three/fiber
- `src/app/page.js` — Main app page
- `src/app/certificates/` — Certificate generation page
- `src/app/generate-certificate/` — API route for certificate generation

## Certificate Generation
The certificate generation feature allows attendees to download their participation certificates by entering their name and roll number. The attendee data is stored securely in environment variables and not exposed in the public repository.

### Security Notes
- Attendee data is stored in `.env.local` file which is ignored by git
- Never commit sensitive attendee information to the repository
- The `ATTENDEES_DATA` environment variable should contain a JSON string with attendee objects

## Customization
- Replace placeholder images and text with your own content.
- Update the AI Query section with your Gemini API key if needed.
- Add attendee data to the `ATTENDEES_DATA` environment variable for certificate generation.

---

Reimagined with Next.js & Gemini.
