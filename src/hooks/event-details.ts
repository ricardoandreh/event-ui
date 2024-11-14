import { useQuery } from "@tanstack/react-query";
import EventService from "../services/EventService";
import { Event } from "../types/event";

export default function useEventDetails(id?: string) {
  const { data: event, isPending } = useQuery<Event | null>({
    queryKey: ["event", { id }],
    queryFn: async () => {
      if (!id) return null;

      const { data } = await EventService.getEvent(id);

      return data;
    },
    staleTime: 1000 * 60, // 1 minuto
    enabled: !!id,
  });

  return { event, isPending };
}
