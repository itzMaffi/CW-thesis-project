import { Express } from 'express';
import { getTodayEventsJob } from './jobs';
import { createServer } from './server';

const app: Express = createServer();

const PORT = process.env.PORT ?? 3000;
const HOST = 'http://localhost';

getTodayEventsJob.start();

app.listen(PORT, () => {
  console.log(`Proxy server is running on ${HOST} ✅`);
});
