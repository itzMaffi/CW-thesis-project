import { Request, Response } from 'express';
import { promises as fs } from 'fs';

export async function getCalendarEvents(req: Request, res: Response) {
  const eventsRaw = await fs.readFile('./events.json', 'utf-8');
  res.send(JSON.parse(eventsRaw));
}
