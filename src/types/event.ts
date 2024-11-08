export interface Event {
  id: number;
  organizer: number;
  organizer_detail: string;
  title: string;
  description: string;
  date: string;
  is_remote: boolean;
  event_url: string;
  created_at: string;
  updated_at: string;
}

export interface EventsResponse {
  results: Event[];
}
