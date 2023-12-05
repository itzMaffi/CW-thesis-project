import request from 'supertest';
import { createServer } from '../server';
// import { describe, it, expect } from '@jest/globals';

const app = createServer();

describe('Slack API', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/slack-messages');
    expect(res.status).toBe(200);
  });
});
