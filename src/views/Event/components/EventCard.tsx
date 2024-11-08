import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Event } from "../../../types/event";

export default function EventCard({ event }: { event: Event }) {
  const dateToFormat = useMemo(() => {
    return new Date(event?.date);
  }, [event?.date]);

  const formattedDate = useMemo(() => {
    return dateToFormat.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, [dateToFormat]);

  const formattedTime = useMemo(() => {
    return dateToFormat.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [dateToFormat]);

  return (
    <Link to={`/event/${event?.id}`} className="event-link">
      <div className="event-card">
        <h2>{event?.title}</h2>
        <span>@{`${formattedDate} ${formattedTime}`}</span>
      </div>
    </Link>
  );
}
