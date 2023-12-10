import React, { useEffect, useState } from 'react';
import { Widget } from '../widget/Widget';
import WidgetHeader from '../widgetHeader/WidgetHeader';
import parse from 'html-react-parser';
import emoji from 'emoji-dictionary';
import slackLogo from '../../assets/slack-logo.svg';

const Announcement: React.FC<{ widget: Widget }> = ({ widget }) => {
  const [slackMessages, setSlackMessages] = useState<string[]>([]);

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  async function fetchSlackMessages() {
    try {
      const response = await fetch(`${backendURL}/slack-messages`);

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

  const openSlackChannel = () => {
    const slackUrl = 'slack://channel?team=T0676K8HS79&id=C067J7TJGRK';
    window.open(slackUrl, '_blank');
  };

  return (
    <div className="relative">
      <WidgetHeader widget={widget}>Announcements</WidgetHeader>
      <ul className="px-2 py-4">
        {slackMessages.map((message: string, index: number) => (
          <li
            key={index}
            className="text-lg mb-2 bg-cp-light-blue rounded-lg px-4 py-2 text-cp-dark-blue border border-slate-200 bg-white/50 "
          >
            {formatSlackMessage(message)}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <button
          onClick={openSlackChannel}
          className="w-36 bg-cp-blue hover:bg-cp-middle-blue font-bold font-sans text-white p-2 rounded-md  mt-1  active:scale-90 shadow-md active:shadow-inner
          flex justify-center items-center gap-2 mb-4"
        >
          <div className="text-sm">Open in</div>
          <img src={slackLogo} className="h-3 w-30" alt="Slack logo" />
        </button>
      </div>
    </div>
  );
};

export default Announcement;
