import '@testing-library/jest-dom';
import {jest} from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
jest.mock('/src/utils/MyCrypto', () => ({
  randomUUID: () => 'mock-uuid', // Return a fixed value for testing
}));

fetchMock.enableMocks();
