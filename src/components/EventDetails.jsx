import { useEffect, useState } from "react";
import EventService from "../services/EventService";

const EventDetails = ({ params }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await EventService.getEvent(params.id);
      
      setEvent(data);
    };

    fetchEvent();
  }, [params.id]);
};

export default EventDetails;
