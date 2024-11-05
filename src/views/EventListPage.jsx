import React, { useEffect, useState } from "react";
import EventService from "../services/EventService";
import EventCard from "../components/Event/EventCard";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await EventService.getEvents();

      setEvents(data?.results);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <main>
      <h1>Event UI</h1>

      <section className="events">
        {!loading ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <h1>Carregando...</h1>
        )}
      </section>
    </main>
  );
}
