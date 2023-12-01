import { CronJob } from 'cron';
import { getTodayEvents } from './utils/calendar';

export const getTodayEventsJob = new CronJob(
  '0 0 * * *',
  getTodayEvents,
  undefined,
  undefined,
  undefined,
  undefined,
  true
);
