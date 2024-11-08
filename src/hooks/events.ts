import { useQuery } from "@tanstack/react-query";
import EventService from "../services/EventService";

export default function useEvents() {
  const { data: events, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await EventService.getEvents();

      return data?.results;
    },
    staleTime: 1000 * 60, // 1 minute
  });

  return { events, isPending };
}
