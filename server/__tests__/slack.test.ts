import request from 'supertest';
import { createServer } from '../server';
import { setCachedMessages } from '../controllers/slackController';

const app = createServer();

describe('GET /slack-messages', () => {
  beforeEach(() => {
    setCachedMessages(['Mocked message 1', 'Mocked message 2']);
  });

  afterEach(() => {
    // reset cachedMessages after each test
    setCachedMessages([]);
  });

  it('should return slack messages', async () => {
    const response = await request(app).get('/slack-messages');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['Mocked message 1', 'Mocked message 2']);
  });
});
