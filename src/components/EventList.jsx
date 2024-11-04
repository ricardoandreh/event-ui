import React, { useEffect, useState } from "react";
import EventService from "../services/EventService";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await EventService.getEvents();

      setEvents(data.results);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <h1>Event UI</h1>

      <section className="events">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </>
  );
};

export default EventList;
