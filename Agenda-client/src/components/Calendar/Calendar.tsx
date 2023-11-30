import { useEffect, useState } from 'react';
import { getTodayEvents } from './calendarService';

type Event = {
  summary: string;
  start: string;
  end: string;
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    (async () => {
      const todayEvents: Event[] = await getTodayEvents();
      setEvents(todayEvents);
    })();
  }, []);

  return (
    <>
      <div className="bg-cw-orange w-full text-center p-2 text-lg font-bold text-white ">
        Schedule
      </div>
      {events &&
        events.map((event: Event) => (
          <div>
            <p>{event.start}</p>
            <p>{event.summary}</p>
            <p>{event.end}</p>
          </div>
        ))}
    </>
  );
}
