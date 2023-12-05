const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000';

export type Event = {
  id: string;
  summary: string;
  start: string;
  end: string;
};

function sortEvents(aEvent: Event, bEvent: Event) {
  return Date.parse(aEvent.start) - Date.parse(bEvent.start);
}

export async function getTodayEvents() {
  const data = await fetch(`${BACKEND_URL}/calendar`);
  const eventList = await data.json();
  eventList.sort(sortEvents);
  return eventList;
}
