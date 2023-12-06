import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NewHelpRequest from './NewHelpRequest';
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

test('renders NewHelpRequest component', () => {
  const widget = new Widget(WidgetType.helpRequest, 'someDataId');
  render(<NewHelpRequest widget={widget} />);
  expect(screen.getByText(/Ask for a help/i)).toBeInTheDocument();
});

test('toggles student list on click', () => {
  const widget = new Widget(WidgetType.helpRequest, 'someDataId');
  render(<NewHelpRequest widget={widget} />);
  const inputArea = screen.getByPlaceholderText(/add students here/i);
  fireEvent.click(inputArea);
  expect(screen.getByTestId('student-list')).toBeInTheDocument();
  fireEvent.click(inputArea);
  expect(screen.queryByTestId('student-list')).toBeNull();
});

test('filters students based on input', () => {
  const widget = new Widget(WidgetType.helpRequest, 'someDataId');
  render(<NewHelpRequest widget={widget} />);
  const input = screen.getByPlaceholderText(/add students here/i);
  fireEvent.change(input, { target: { value: 'Isaiah' } });
  expect(screen.getByText(/Isaiah/i)).toBeInTheDocument();
});
