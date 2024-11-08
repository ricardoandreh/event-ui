import { useQuery } from "@tanstack/react-query";
import { Event } from "types/event";
import EventService from "../services/EventService";

export default function useEventDetails(id: string) {
  const { data: event } = useQuery<Event>({
    queryKey: ["event", { id }],
    queryFn: async () => {
      const { data } = await EventService.getEvent(id as string);

      return data;
    },
    staleTime: 1000 * 60, // 1 minute
    enabled: !!id,
  });

  return { event };
}
