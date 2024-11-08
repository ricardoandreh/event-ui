import { Link } from "react-router-dom";
import { Event } from "../../../types/event";
import { formatEventDate } from "../../../utils/format-date";

export default function EventCard({ event }: { event: Event }) {
  const { formattedDate, formattedTime } = formatEventDate(event.date);

  return (
    <Link to={`/event/${event?.id}`} className="event-link">
      <div className="event-card">
        <h2>{event?.title}</h2>
        <span>@{`${formattedDate} ${formattedTime}`}</span>
      </div>
    </Link>
  );
}
