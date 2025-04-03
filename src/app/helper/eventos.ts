import { NEventos } from '../components/eventos/eventos.model';

export function findEvent(newEventosData: NEventos.Body[], date: Date): NEventos.FoundEvent | null {
  for (let eventosIndex = 0; eventosIndex < newEventosData.length; eventosIndex++) {
    const dayEvents = newEventosData[eventosIndex].events;
    const eventIndex = dayEvents.findIndex(event => event.date.getTime() === date.getTime());

    if (eventIndex !== -1) {
      return {
        eventIndex,
        eventosIndex, 
        isSameDate: newEventosData[eventosIndex].date.getTime() === date.getTime()
      };
    }
  }
  return null;
}

export function updateEvent(
  newEventosData: NEventos.Body[],
  item: NEventos.IEvent,
  foundEvent: NEventos.FoundEvent
) {
  if (foundEvent.isSameDate) {
    newEventosData[foundEvent.eventosIndex].events[foundEvent.eventIndex] = item;
  } else {
    newEventosData[foundEvent.eventosIndex].events.splice(foundEvent.eventIndex, 1);
    createEvent(newEventosData, item);
  }
}

export function createEvent(newEventosData: NEventos.Body[], item: NEventos.IEvent) {
  newEventosData.push({
    day: item.date.getDate(),
    isCurrentDay: false,
    isCurrentMonth: true,
    events: [item],
    date: item.date
  });
}

export function getSelectedDate(year: number, month: number, day: number): Date {
  return new Date(year, month, day);
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; 
}
