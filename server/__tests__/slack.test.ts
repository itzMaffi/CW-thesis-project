import request from 'supertest';
import { createServer } from '../server';
import { setCachedMessages } from '../controllers/slackController';
import nock from 'nock';

const app = createServer();

describe('GET /slack-messages', () => {
  beforeEach(() => {
    nock('https://slack.com')
      .get('/api/conversations.history')
      .query({ channel: 'C067J7TJGRK', limit: 2 })
      .reply(200, {
        ok: true,
        messages: [{ text: 'Mocked message 1' }, { text: 'Mocked message 2' }],
      });
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
