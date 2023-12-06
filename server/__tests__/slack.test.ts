// Global module mock (outside of any function, at the top of the file)
jest.mock('../controllers/slackController', () => ({
  initializeMessageFetching: jest.fn(),
  getSlackMessages: jest.fn(),
}));

import request from 'supertest';
import { createServer } from '../server';
import { getSlackMessages } from '../controllers/slackController';

const app = createServer();

describe('GET /slack-messages', () => {
  beforeEach(() => {
    (getSlackMessages as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json(['Mocked message 1', 'Mocked message 2']);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return mocked slack messages', async () => {
    const response = await request(app).get('/slack-messages');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(['Mocked message 1', 'Mocked message 2']);
  });
});
