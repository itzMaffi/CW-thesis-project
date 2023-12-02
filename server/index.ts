import express, { Express } from 'express';
import cors from 'cors';
import router from './routers/router';
import authRouter from './routers/oauth';
import requestRouter from './routers/request';
import { getTodayEventsJob } from './jobs';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost:3000';

const FRONTEND_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.URL
    : 'http://localhost:5173';

getTodayEventsJob.start();

app.options('*', function (req, res, next) {
  // TODO change this to the correct URL of frontend for prod
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', [
    'X-Requested-With',
    'content-type',
    'credentials',
  ]);
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.status(200);
  next();
});

app.use(cors());
app.use(express.json());

app.use('/oauth', authRouter);
app.use('/request', requestRouter);
app.use(router);

app.listen(PORT, () => {
  console.log(`Proxy server is running on ${HOST} ✅`);
});
