import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { jest } from '@jest/globals';

let id = 0;
jest.mock('../utils/MyCrypto',()=>({
  randomUUID: jest.fn().mockReturnValue(''+id++),
}));


test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
