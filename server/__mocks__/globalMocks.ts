// Global module to mock all the modules that are used in the tests
jest.mock('../controllers/slackController', () => ({
  initializeMessageFetching: jest.fn(),
  getSlackMessages: jest.fn(),
  fetchAndUpdate: jest.fn(),
}));

jest.mock('../utils/slack', () => ({
  fetchSlackMessages: jest.fn(),
}));
