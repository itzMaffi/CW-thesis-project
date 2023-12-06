import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
jest.mock('../utils/MyCrypto', () => ({
  randomUUID: () => 'mock-uuid', // Return a fixed value for testing
}));

fetchMock.enableMocks();
