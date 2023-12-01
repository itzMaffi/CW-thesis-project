import { promises as fs } from 'fs';
import 'dotenv/config';

const CALENDAR_URL =
  'https://www.googleapis.com/calendar/v3/calendars/c_533d5c872566f02174ccef34605e959653f83e192e1e78d943b1c81fc01f9c98%40group.calendar.google.com/events';
const GCAL_API_KEY = process.env.GCAL_API_KEY;

// async function retry(fn: ()=> Promise<unknown>, retries: number, delay: number) {
//   try {
//     await fn();
//   } catch (error) {
//     if (retries <= 0) throw error;
//     setTimeout(() => {
//       return retry(fn, retries - 1, delay);
//     }, delay);
//   }
// }

type GCalEventApiResponse = {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: any[];
  nextSyncToken: string;
  items: CalendarEvent[];
};

type CalendarEvent = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: Person;
  organizer: Organizer;
  start: EventDateTime;
  end: EventDateTime;
  iCalUID: string;
  sequence: number;
  eventType: string;
};

type Person = {
  email: string;
};

type Organizer = {
  email: string;
  displayName: string;
  self: boolean;
};

type EventDateTime = {
  dateTime: string;
  timeZone: string;
};

function cleanupEvent(event: CalendarEvent) {
  return {
    id: event.id,
    summary: event.summary,
    start: event.start.dateTime,
    end: event.end.dateTime,
  };
}

export async function getTodayEvents() {
  const todayStart = new Date();
  const todayEnd = new Date();

  todayStart.setHours(0, 0, 0, 0);
  todayEnd.setHours(24, 0, 0, 0);

  try {
    const data = await fetch(CALENDAR_URL + '?key=' + GCAL_API_KEY);
    const apiResponse: GCalEventApiResponse = await data.json();

    const allEvents = apiResponse.items;

    const todayEvents = allEvents
      .filter((event: CalendarEvent) => {
        const eventStart = new Date(event.start.dateTime);
        return eventStart > todayStart && eventStart < todayEnd;
      })
      .map((event: CalendarEvent) => cleanupEvent(event));

    await fs.writeFile('./events.json', JSON.stringify(todayEvents), 'utf-8');
  } catch (error) {
    console.error(error);
  }
}
