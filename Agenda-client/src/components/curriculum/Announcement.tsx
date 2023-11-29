import React, { useEffect, useState } from 'react';

const Announcement: React.FC = () => {
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

    // Poll every 5 minutes
    const intervalId = setInterval(() => {
      fetchSlackMessages();
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Announcements</h1>
      <ul>
        {slackMessages.map((message: string, index: number) => (
          <li key={index} className="text-lg mb-2">
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
