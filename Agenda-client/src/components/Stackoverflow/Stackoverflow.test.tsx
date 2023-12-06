import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StackOverflow } from './Stackoverflow';
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

test('renders Stackoverflow component', () => {
  const widget = new TestWidget(WidgetType.stackOverflow, 'someDataId');
  render(<StackOverflow widget={widget} />);
  expect(
    screen.getByText(/Find similar questions on Stack Overflow/i)
  ).toBeInTheDocument();
});
