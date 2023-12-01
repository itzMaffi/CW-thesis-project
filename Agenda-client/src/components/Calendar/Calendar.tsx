import { useEffect, useState } from 'react';
import { getTodayEvents, Event } from './calendarService';
import clsx from 'clsx';
import { DateTime } from 'luxon';

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const todayEvents: Event[] = await getTodayEvents();
        setEvents(todayEvents);
      } catch (error) {
        setError(`There was an error getting today's events`);
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-cw-orange w-full text-center p-2 text-lg font-bold text-white ">
        Schedule
      </div>
      {events &&
        !error &&
        events.map((event: Event) => (
          <CalendarEvent key={event.id} event={event} />
        ))}
      {!events && error && (
        <div className="m-2 p-2 rounded-lg text-red-700 bg-red-200">
          {error}
        </div>
      )}
    </>
  );
}

function CalendarEvent({ event }: { event: Event }) {
  return (
    <div
      className={clsx(
        'm-2 p-2 rounded-lg',
        new Date(event.end) < new Date()
          ? 'bg-gray-100 text-gray-500'
          : 'bg-cw-light-orange text-cw-dark-orange'
      )}
    >
      <p className="text-sm">
        {DateTime.fromISO(event.start).toLocaleString(DateTime.TIME_SIMPLE)}
      </p>
      <p className="font-semibold text-lg my-2">{event.summary}</p>
      <p className="text-sm">
        {DateTime.fromISO(event.end).toLocaleString(DateTime.TIME_SIMPLE)}
      </p>
    </div>
  );
}
