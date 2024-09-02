import Event from '../Models/Event';

describe('Event', () => {
  let event;

  beforeEach(() => {
    event = new Event('Meeting', '2024-08-18', 'Discuss project progress');
  });

  test('should create an event with name, date, and description', () => {
    expect(event.name).toBe('Meeting');
    expect(event.date).toBe('2024-08-18');
    expect(event.description).toBe('Discuss project progress');
  });

  test('should return event details in the correct format', () => {
    const details = event.getEventDetails();
    expect(details).toBe('Meeting is scheduled on 2024-08-18. Details: Discuss project progress');
  });

  test('should handle empty name and description', () => {
    const emptyEvent = new Event('', '2024-08-18', '');
    expect(emptyEvent.name).toBe('');
    expect(emptyEvent.description).toBe('');
    const details = emptyEvent.getEventDetails();
    expect(details).toBe(' is scheduled on 2024-08-18. Details: ');
  });

  test('should handle missing date', () => {
    const missingDateEvent = new Event('Meeting', '', 'No date');
    expect(missingDateEvent.date).toBe('');
    const details = missingDateEvent.getEventDetails();
    expect(details).toBe('Meeting is scheduled on . Details: No date');
  });

  test('should handle different types of data', () => {
    const mixedTypeEvent = new Event(123, true, []);
    expect(mixedTypeEvent.name).toBe(123);
    expect(mixedTypeEvent.date).toBe(true);
    expect(mixedTypeEvent.description).toEqual([]);
    const details = mixedTypeEvent.getEventDetails();
    expect(details).toBe('123 is scheduled on true. Details: ');
  });
});
