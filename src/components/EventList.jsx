import React, { useEffect, useState } from "react";
import EventService from "../services/EventService";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await EventService.getEvents();

      setEvents(response.data.results); // Assuming "data.results" holds the event data
    };

    fetchEvents();
  }, []);

  return (
    <ul>
      {events.map((event) => (
        <EventCard key={event.id} event={event} /> // Added key prop for better performance
      ))}
    </ul>
  );
};

export default EventList;
