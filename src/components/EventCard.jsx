import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="event-link">
      <div className="event-card">
        <h2>{event.title}</h2>
        <span>@{event.time} on {event.date}</span>
      </div>
    </Link>
  );
};

export default EventCard;
