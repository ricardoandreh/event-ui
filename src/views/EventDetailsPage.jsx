import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventService from "../services/EventService";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
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

        setEvent({
          ...data,
          formattedDate,
          formattedTime,
        });
      } catch (error) {
        console.error("Erro ao buscar o evento:", error);
      }
    }

    fetchEvent();
  }, [id]);

  return event ? (
    <div>
      <h1>{event?.title}</h1>
      <p>
        {event?.formattedDate} às {event?.formattedTime}
      </p>
      <p>{event?.description}</p>
    </div>
  ) : (
    <h1>Carregando...</h1>
  );
}
