import request from 'supertest';
import { createServer } from '../server';
import { getSlackMessages } from '../controllers/slackController';

describe('GET /slack-messages', () => {
  beforeEach(() => {
    (getSlackMessages as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(['Mocked message 1', 'Mocked message 2']);
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return mocked slack messages', async () => {
    const app = createServer();
    const response = await request(app).get('/slack-messages');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['Mocked message 1', 'Mocked message 2']);
  });
});
