import request from 'supertest';
import { createServer } from '../server';

const app = createServer();

describe('Slack API', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/slack-messages');
    expect(res.status).toBe(200);
  });
});
