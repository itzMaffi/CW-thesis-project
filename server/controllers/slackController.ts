import { Request, Response } from 'express';
import 'dotenv/config';
import { fetchSlackMessages } from '../utils/slack';

const CACHE_TTL = 5 * 60 * 1000;
let cachedData: string[] | undefined = [];

export async function initializeMessageFetching() {
  // Call immediately and set interval
  await fetchAndUpdate();
  setInterval(fetchAndUpdate, CACHE_TTL);
}

async function fetchAndUpdate() {
  try {
    cachedData = await fetchSlackMessages();
  } catch (error) {
    console.error('Error fetching Slack messages:', error);
  }
}

export async function getSlackMessages(req: Request, res: Response) {
  if (cachedData) {
    res.status(200).json(cachedData);
  } else {
    res.status(503).send('Data is currently unavailable.');
  }
}
