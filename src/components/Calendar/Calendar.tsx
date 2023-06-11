import brLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/react";
import { Container, Theme, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { COLORS } from "@constants";
import { eventsDatabase, updateEvent } from "@database";
import { useAuth } from "@hooks";
import { ICalendarEvent, IEventColor } from "@types";
import * as Styles from "./Calendar.styles";
import { EventDialog } from "./EventDialog/EventDialog";
import { Toolbar } from "./Toolbar/Toolbar";

export const Calendar = () => {
  const { t } = useTranslation();
  const calendarRef = useRef<FullCalendar | null>(null);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [date, setDate] = useState<Date>(new Date());
  const [dialog, setDialog] = useState<any>({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });
  const { user } = useAuth();
  const [events, setEvents] = useState<ICalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] =
    useState<ICalendarEvent[]>(events);
  const [eventColors, setEventColors] = useState<IEventColor[]>([]);

  const eventColorsConst: IEventColor[] = eventColors;
  const colors = [...COLORS];

  const getLabelColor = (userId: string) => {
    const found = eventColorsConst.find((color) => color.userId === userId);

    if (found) {
      return found.color;
    }

    const color = colors[0];

    eventColorsConst.push({
      userId,
      color,
    });

    setEventColors(eventColorsConst);

    colors.splice(0, 1);

    return color;
  };

  const handleCloseDialog = (): void => {
    setDialog({
      isOpen: false,
    });
  };

  useEffect(() => {
    const proccessEvents = async () => {
      console.log("processando");
      const events = await eventsDatabase.getEventsByUser(user?.id);

      const eventsFormatted = events.map((event: any) => ({
        ...event,
        color: getLabelColor(event.userId),
      }));

      setEvents(eventsFormatted);
    };

    proccessEvents();
  }, [dialog.isOpen]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleResize = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarElApi = calendarEl.getApi();
      const newView = smDown ? "timeGridDay" : "dayGridMonth";

      calendarElApi.changeView(newView);
    }
  }, [calendarRef, smDown]);

  useEffect(() => {
    handleResize();
  }, [smDown]);

  const handleDateToday = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarElApi = calendarEl.getApi();

      calendarElApi.today();
      setDate(calendarElApi.getDate());
    }
  };

  const handleDatePrev = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarElApi = calendarEl.getApi();

      calendarElApi.prev();
      setDate(calendarElApi.getDate());
    }
  };

  const handleDateNext = (): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarElApi = calendarEl.getApi();

      calendarElApi.next();
      setDate(calendarElApi.getDate());
    }
  };

  const handleAddClick = (): void => {
    setDialog({
      isOpen: true,
    });
  };

  const handleRangeSelect = (arg: DateSelectArg): void => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarElApi = calendarEl.getApi();

      calendarElApi.unselect();
    }

    setDialog({
      isOpen: true,
      range: {
        start: arg.start.getTime(),
        end: arg.end.getTime(),
      },
    });
  };

  const handleEventSelect = (arg: EventClickArg): void => {
    setDialog({
      isOpen: true,
      eventId: arg.event.id,
    });
  };

  const handleEventDrop = async (
    arg: EventResizeDoneArg | EventDropArg
  ): Promise<void> => {
    const { event } = arg;

    try {
      await updateEvent(event.id, {
        allDay: event.allDay,
        start: event.start?.getTime(),
        end: event.end?.getTime(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const selectedEvent =
    dialog.eventId && events.find((event: any) => event.id === dialog.eventId);

  return (
    <Container component="main" maxWidth="lg">
      <Styles.Title variant="h4">{t("schedule.title")}</Styles.Title>
      <Styles.Card>
        <Toolbar
          date={date}
          onAddClick={handleAddClick}
          onDateNext={handleDateNext}
          onDatePrev={handleDatePrev}
          onDateToday={handleDateToday}
        />
        <Styles.FullCalendarWrapper>
          <FullCalendar
            allDayMaintainDuration
            dayMaxEventRows={3}
            droppable
            editable
            eventClick={handleEventSelect}
            eventDisplay="block"
            eventDrop={handleEventDrop}
            events={filteredEvents}
            headerToolbar={false}
            height={700}
            initialDate={date}
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            ref={calendarRef}
            rerenderDelay={10}
            select={handleRangeSelect}
            selectable
            weekends
            locale={brLocale}
          />
        </Styles.FullCalendarWrapper>
      </Styles.Card>
      <EventDialog
        event={selectedEvent}
        onAddComplete={handleCloseDialog}
        onClose={handleCloseDialog}
        onDeleteComplete={handleCloseDialog}
        onEditComplete={handleCloseDialog}
        open={dialog.isOpen}
        range={dialog.range}
      />
    </Container>
  );
};
