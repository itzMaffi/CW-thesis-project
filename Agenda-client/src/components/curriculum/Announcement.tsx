import React, { useEffect, useState } from 'react';
import { Widget } from '../../utils/Widget';
import WidgetHeader from './WidgetHeader';

const Announcement: React.FC<{ widget: Widget }> = ({ widget }) => {
  const [slackMessages, setSlackMessages] = useState<string[]>([]);

  async function fetchSlackMessages() {
    try {
      const response = await fetch('http://localhost:3000/slack-messages');

      if (response.ok) {
        const data = await response.json();
        setSlackMessages(data);
      } else {
        console.error('Server responded with an error:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during the fetch:', error);
    }
  }

  useEffect(() => {
    // initial fetch when component loads
    fetchSlackMessages();

    // Poll every 5 minutes the cached messages from backend
    const intervalId = setInterval(() => {
      fetchSlackMessages();
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative">
      <WidgetHeader widget={widget}>Announcements</WidgetHeader>
      <ul className="px-2 py-4">
        {slackMessages.map((message: string, index: number) => (
          <li
            key={index}
            className="text-lg mb-2 bg-cw-light-orange rounded-lg px-4 py-2 text-gray-700"
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
