const getEvents = async () => {
  const response = await fetch(
    'https://nextjscourse-f67f6-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  );
  const data = await response.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};
const getFeaturedEvents = async () => {
  const events = await getEvents();

  return events.filter((event) => event.isFeatured);
};
const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const events = await getEvents();

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
};
const getEventById = async (id) => {
  const events = await getEvents();

  return events.find((event) => event.id === id);
};

export { getEvents, getFeaturedEvents, getFilteredEvents, getEventById };
