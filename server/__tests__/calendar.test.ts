import request from 'supertest';
import { createServer } from '../server';

const app = createServer();

describe('Calendar API', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/calendar');
    expect(res.status).toBe(200);
  });
});
