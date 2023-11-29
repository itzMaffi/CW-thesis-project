import express, { Express } from 'express';
import cors from 'cors';
import router from './router';

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port} ✅`);
});
