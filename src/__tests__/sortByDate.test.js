import { sortByDate } from '../Components/CalendarApp';
test('sortByDate sorts events by date', () => {
  const events = [
    { name: 'Event 1', date: '2024-08-18' },
    { name: 'Event 2', date: '2024-07-18' },
    { name: 'Event 3', date: '2024-09-18' },
  ];

  const sortedEvents = sortByDate(events);
  expect(sortedEvents[0].name).toBe('Event 2');
  expect(sortedEvents[1].name).toBe('Event 1');
  expect(sortedEvents[2].name).toBe('Event 3');
});
