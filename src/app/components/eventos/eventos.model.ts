export namespace NEventos {
    export type Header = [string, string, string, string, string, string, string];

    export interface Body {
        day: number;
        isCurrentDay: boolean;
        isCurrentMonth: boolean;
        events: IEvent[];
        date: Date;
    }

    export interface IEvent {
        name: string;
        id: string;
        icon: string;
        date: Date;
        background: string;
        color: string;
    }

    export interface FoundEvent {
        eventIndex: number;
        eventosIndex: number;
        isSameDate: boolean;
    }
    export type FindEvent = FoundEvent | null | undefined;
}
