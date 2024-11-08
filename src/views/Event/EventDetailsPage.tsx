import { useParams } from "react-router-dom";
import useEventDetails from "../../hooks/event-details";
import { formatEventDate } from "../../utils/format-date";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const { event } = useEventDetails(id as string);

  if (!event) return <h1>Carregando...</h1>;

  const { formattedDate, formattedTime } = formatEventDate(event.date);

  return (
    <main>
      <h1>{event?.title}</h1>
      <p>
        {formattedDate} às {formattedTime}
      </p>
      <p>{event?.description}</p>
    </main>
  );
}
