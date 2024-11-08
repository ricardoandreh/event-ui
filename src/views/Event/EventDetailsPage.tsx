import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useEventDetails from "../../hooks/event-details";
import { formatEventDate } from "../../utils/format-date";

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();

  const { event, isPending } = useEventDetails(id as string);

  const formattedDateTime = useMemo(
    () => formatEventDate(event?.date),
    [event?.date]
  );

  if (isPending) return <h1>Carregando...</h1>;

  return (
    <main>
      <h1>{event?.title}</h1>
      <p>
        {formattedDateTime.formattedDate} às {formattedDateTime.formattedTime}
      </p>
      <p>{event?.description}</p>
    </main>
  );
}
