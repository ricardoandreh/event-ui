import { useParams } from "react-router-dom";
import useEventDetails from "../../hooks/event-details";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const { event, isPending } = useEventDetails(id as string);

  return isPending ? (
    <h1>Carregando...</h1>
  ) : (
    <main>
      <h1>{event?.title}</h1>
      <p>
        {event?.formattedDate} às {event?.formattedTime}
      </p>
      <p>{event?.description}</p>
    </main>
  );
}
