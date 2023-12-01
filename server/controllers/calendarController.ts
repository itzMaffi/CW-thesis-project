import { Request, Response } from 'express';
import { promises as fs } from 'fs';

export async function getCalendarEvents(req: Request, res: Response) {
  try {
    const eventsRaw = await fs.readFile('./events.json', 'utf-8');
    res.send(JSON.parse(eventsRaw));
  } catch (error) {
    res.status(500).send({message: 'Something went wrong', error: error});
  }
}
