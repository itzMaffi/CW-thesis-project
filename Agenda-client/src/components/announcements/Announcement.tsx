import React, { useEffect, useState } from 'react';
import { Widget } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import parse from 'html-react-parser';
import emoji from 'emoji-dictionary';

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

  function formatSlackMessage(message: string) {
    let formattedMessage = message
      .replace(/\*([^*]+)\*/g, '<b>$1</b>') // bold
      .replace(/_([^_]+)_/g, '<i>$1</i>') // italic
      .replace(/~([^~]+)~/g, '<del>$1</del>'); // strikethrough

    formattedMessage = formattedMessage.replace(
      /:([\w-]+):/g,
      (match, name) => {
        return emoji.getUnicode(name) || match;
      }
    );

    return parse(formattedMessage);
  }

  return (
    <div className="relative">
      <WidgetHeader widget={widget}>Announcements</WidgetHeader>
      <ul className="px-2 py-4">
        {slackMessages.map((message: string, index: number) => (
          <li
            key={index}
            className="text-lg mb-2 bg-cw-light-orange rounded-lg px-4 py-2 text-gray-700"
          >
            {formatSlackMessage(message)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
