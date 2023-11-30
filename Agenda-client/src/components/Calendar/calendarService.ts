export async function getTodayEvents() {
  const data = await fetch('http://localhost:3000/calendar');
  const eventList = await data.json();

  return eventList;
}
