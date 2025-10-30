import { promises as fs } from 'fs';
import path from 'path';

export async function getEventMarkdownContent(eventId: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'events', `${eventId}.md`);
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    // Return default content if markdown file doesn't exist
    return `
# Event Content

This event content is being prepared. Please check back soon for detailed information about this event.

## About This Event

We're currently updating the content for this event. In the meantime, you can:

- Check out our other events
- Follow us on social media for updates
- Contact us if you have specific questions

## Stay Updated

For the latest information about our events, please visit our main events page or reach out to our team.

*Content will be available soon!*
    `.trim();
  }
}

export async function getAllEventMarkdownFiles(): Promise<string[]> {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'events');
    const files = await fs.readdir(contentDir);
    return files.filter(file => file.endsWith('.md')).map(file => file.replace('.md', ''));
  } catch (error) {
    return [];
  }
}