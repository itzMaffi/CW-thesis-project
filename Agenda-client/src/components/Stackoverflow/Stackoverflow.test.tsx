import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StackOverflow } from './Stackoverflow';
import { Widget, WidgetType } from '../widget/Widget';
import React from 'react';

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const crypto = require('crypto');

  Object.defineProperty(globalThis, 'crypto', {
    value: {
      randomUUID: () => crypto.randomUUID(),
    },
  });
});

test('renders Stackoverflow component', () => {
  const widget = new Widget(WidgetType.stackOverflow, 'someDataId');
  render(<StackOverflow widget={widget} />);
  expect(
    screen.getByText(/Find similar questions on Stack Overflow/i)
  ).toBeInTheDocument();
});
