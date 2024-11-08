import { Event } from "types/event";
import useEvents from "../../hooks/events";
import EventCard from "./components/EventCard";

export default function EventList() {
  const { events, isPending } = useEvents();

  return (
    <main>
      <h1>Event UI</h1>

      <section className="events">
        {isPending && <h1>Carregando...</h1>}

        {events?.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
    </main>
  );
}
