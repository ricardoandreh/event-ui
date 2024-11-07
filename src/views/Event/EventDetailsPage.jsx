import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EventService from "../../services/EventService";

export default function EventDetails() {
  const { id } = useParams();

  const { data: event, isPending } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await EventService.getEvent(id);

      const dateToFormat = new Date(data?.date);

      const formattedDate = dateToFormat.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedTime = dateToFormat.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        ...data,
        formattedDate,
        formattedTime,
      };
    },
    refetchOnWindowFocus: false,
  });

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
