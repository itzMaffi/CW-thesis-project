export type Event = {
  summary: string;
  start: string;
  end: string;
};

function sortEvents(aEvent: Event, bEvent: Event) {
  return Date.parse(aEvent.start) - Date.parse(bEvent.start);
}

export async function getTodayEvents() {
  const data = await fetch('http://localhost:3000/calendar');
  const eventList = await data.json();
  eventList.sort(sortEvents);
  return eventList;
}
