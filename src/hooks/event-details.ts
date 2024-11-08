import { useQuery } from "@tanstack/react-query";
import EventService from "../services/EventService";

export default function useEventDetails(id: string) {
  const { data: event, isPending } = useQuery({
    queryKey: ["event", { id }],
    queryFn: async () => {
      const { data } = await EventService.getEvent(id as string);

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
    staleTime: 1000 * 60, // 1 minute
    enabled: !!id,
  });

  return { event, isPending };
}
