import express, { Express } from 'express';
import cors from 'cors';
import router from './routers/router';
import authRouter from './routers/oauth';
import requestRouter from './routers/request';

const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

export const createServer = () => {
  const app: Express = express();

  app.options('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', `${FRONTEND_URL}`);
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

  return app;
};
