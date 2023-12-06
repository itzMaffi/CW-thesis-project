import { render, screen } from '@testing-library/react';
import { getTodayEvents } from '../components/Calendar/calendarService';
import Calendar from '../components/Calendar/Calendar';
import { CalendarWidget } from '../components/widget/widgets/Widgets';

jest.mock('../utils/MyCrypto');
jest.mock('../components/Calendar/calendarService');

const mockResponse = {
  resolve: [
    {
      id: 1,
      start: '2023-12-05T09:00:00Z',
      end: '2023-12-05T10:00:00Z',
      summary: 'Introduction to JavaScript ES6 features',
    },
    {
      id: 2,
      start: '2023-12-05T11:00:00Z',
      end: '2023-12-05T12:00:00Z',
      summary:
        'Understanding Asynchronous JavaScript: Callbacks, Promises, and Async/Await',
    },
    {
      id: 3,
      start: '2023-12-05T13:00:00Z',
      end: '2023-12-05T14:00:00Z',
      summary: 'Exploring JavaScript Frameworks: React vs Vue vs Angular',
    },
  ],
  reject: 'error',
};

const mockWidget = new CalendarWidget();

describe('Calendar component', () => {
  it('should render today events if call resolves', async () => {
    (getTodayEvents as jest.Mock).mockResolvedValueOnce(mockResponse.resolve);

    const { findByText } = render(<Calendar widget={mockWidget} />);

    expect(
      await findByText(mockResponse.resolve[0].summary)
    ).toBeInTheDocument();
    expect(
      await findByText(mockResponse.resolve[1].summary)
    ).toBeInTheDocument();
    expect(
      await findByText(mockResponse.resolve[2].summary)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(`There was an error getting today's events`)
    ).not.toBeInTheDocument();
  });

  it('should render error if call rejects', async () => {
    (getTodayEvents as jest.Mock).mockRejectedValue(mockResponse.reject);

    const { findByText } = render(<Calendar widget={mockWidget} />);

    expect(
      await findByText(`There was an error getting today's events`)
    ).toBeInTheDocument();
  });
});
