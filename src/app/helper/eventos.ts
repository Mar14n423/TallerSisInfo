import { NEventos } from '../components/VistaAdmin/eventos/eventos.model';

export function findEvent(newEventosData: NEventos.Body[], item: NEventos.IEvent): NEventos.FindEvent {
    return newEventosData.map((evento, eventosIndex) => {
        const eventIndex = evento.events.findIndex(event => event.id === item.id);
        return eventIndex !== -1 ? { eventIndex, eventosIndex, isSameDate: formatDate(evento.date) === formatDate(item.date) } : null;
    }).find(item => item);
}

export function formatDate(date: Date | string): string {
    const d = date instanceof Date ? date : new Date(date);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  }

export function createEvent(newEventosData: NEventos.Body[], item: NEventos.IEvent) {
    const selectedIndex = newEventosData.findIndex(evento => formatDate(evento.date) === formatDate(item.date));
    if (selectedIndex !== -1) {
        newEventosData[selectedIndex].events.push(item);
    }
}

export function updateEvent(newEventosData: NEventos.Body[], item: NEventos.IEvent, foundEvent: NEventos.FindEvent) {
    if (!foundEvent) return; 
    if (foundEvent.isSameDate) {
        newEventosData[foundEvent.eventosIndex].events[foundEvent.eventIndex] = item;
    } else {
        newEventosData[foundEvent.eventosIndex].events.splice(foundEvent.eventIndex, 1);
        createEvent(newEventosData, item);
    }
}

export function getSelectedDate(date: Date, day = 0, month = 0): Date {
    return new Date(date.getFullYear(), date.getMonth() + month, day);
  }
  

export function templateEventosData(day: number, date: Date) {
    return {
        day,
        date,
        isCurrentDay: false,
        isCurrentMonth: false,
        events: [],
    };
}
