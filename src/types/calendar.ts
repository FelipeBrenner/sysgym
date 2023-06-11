export interface ICalendarEvent {
  id: string;
  allDay: boolean;
  color?: string;
  description: string;
  end: number;
  start: number;
  title: string;
  userId: string;
}

export interface IEventColor {
  userId: string;
  color: string;
}
