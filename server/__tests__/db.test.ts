import request from 'supertest';
import { createServer } from '../server';
const mockingoose = require('mockingoose');
import Message from '../models/messageModel';


describe('GET /dbread', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockingoose.resetAll();
    mockingoose(Message).toReturn({ message: 'Mocked message 1' }, 'find');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return all messages', async () => {
    const app = createServer();
    const response = await request(app).get('/dbread');
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Mocked message 1');
  });
});
