import { MongoMemoryServer } from 'mongodb-memory-server';

const setup = async () => {
  const mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongoServer.getUri();
};

export default setup;
