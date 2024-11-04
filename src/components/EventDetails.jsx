import { useEffect, useState } from 'react';
import EventService from '../services/EventService';

const EventDetails = ({ params }) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await EventService.getEvent(params.id);
      setEvent(response.data);
    };
    fetchEvent();
  }, [params.id]);

  // ... seu conteúdo
};

export default EventDetails;
