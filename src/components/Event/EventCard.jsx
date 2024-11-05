import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const dateToFormat = new Date(event?.date);
  
  const formattedDate = dateToFormat.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = dateToFormat.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link to={`/event/${event?.id}`} className="event-link">
      <div className="event-card">
        <h2>{event?.title}</h2>
        <span>@{`${formattedDate} ${formattedTime}`}</span>
      </div>
    </Link>
  );
}
