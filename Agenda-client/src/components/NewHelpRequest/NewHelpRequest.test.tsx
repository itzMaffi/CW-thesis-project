import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import NewHelpRequest from './NewHelpRequest';
import { Widget, WidgetType } from '../widget/Widget';

import { jest } from '@jest/globals';

jest.mock('../../utils/MyCrypto', () => {
  let id = 0;
  return {
    randomUUID: jest.fn().mockReturnValue('' + id++),
  };
});

class TestWidget extends Widget {
  constructor(type: WidgetType, dataId?: string) {
    super(type, dataId);
  }
}

test('renders NewHelpRequest component', () => {
  const widget = new TestWidget(WidgetType.helpRequest, 'someDataId');
  render(<NewHelpRequest widget={widget} />);
  expect(screen.getByText(/Ask for a help/i)).toBeInTheDocument();
});

test('toggles student list on click', () => {
  const widget = new TestWidget(WidgetType.helpRequest, 'someDataId');
  render(<NewHelpRequest widget={widget} />);
  const inputArea = screen.getByPlaceholderText(/add students here/i);
  fireEvent.click(inputArea);
  expect(screen.getByTestId('student-list')).toBeInTheDocument();
  fireEvent.click(inputArea);
  expect(screen.queryByTestId('student-list')).toBeNull();
});

test('filters students based on input', () => {
  const widget = new TestWidget(WidgetType.helpRequest, 'someDataId');
  render(<NewHelpRequest widget={widget} />);
  const input = screen.getByPlaceholderText(/add students here/i);
  fireEvent.change(input, { target: { value: 'Isaiah' } });
  expect(screen.getByText(/Isaiah/i)).toBeInTheDocument();
});
