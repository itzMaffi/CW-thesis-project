import request from 'supertest';
import { createServer } from '../server';
import messageModel from '../models/messageModel';
const mockingoose = require('mockingoose');

const app = createServer();

describe('Slack API', () => {
  beforeAll(async () => {
    // mock mongoose connection
    mockingoose(messageModel).toReturn({}, 'find');
  });
  it('should return 200 OK', async () => {
    const res = await request(app).get('/slack-messages');
    expect(res.status).toBe(200);
  });
});
