import { useQuery } from "@tanstack/react-query";
import React from "react";
import EventCard from "../components/Event/EventCard";
import EventService from "../services/EventService";

export default function EventList() {
  const { data: events, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await EventService.getEvents();

      return data?.results;
    },
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <main>
      <h1>Event UI</h1>

      <section className="events">
        {isPending && <h1>Carregando...</h1>}

        {events?.map((event) => (
          <EventCard key={event?.id} event={event} />
        ))}
      </section>
    </main>
  );
}
