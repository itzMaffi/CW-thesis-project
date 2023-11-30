import { CronJob } from 'cron';
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

async function getTodayEvents() {
  const data = await fetch(CALENDAR_URL + '?key=' + GCAL_API_KEY);
  const eventsList = await data.json();
  return eventsList;
}

export const getTodayEventsJob = new CronJob('0 0 * * *', getTodayEvents);
