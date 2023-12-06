import request from 'supertest';
import { createServer } from '../server';
const mockingoose = require('mockingoose');
import Message from '../models/messageModel';

const app = createServer();

describe('GET /dbread', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    mockingoose(Message).toReturn({ message: 'Mocked message 1' }, 'find');
  });
  it('should return all messages', async () => {
    const response = await request(app).get('/dbread');
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Mocked message 1');
  });
});
