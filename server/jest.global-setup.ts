import { MongoMemoryServer } from 'mongodb-memory-server';

module.exports = async () => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
};
