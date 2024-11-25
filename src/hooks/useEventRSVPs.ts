import { useState } from 'react';
import { RSVP } from '../types/RSVP';
import { api } from '../utils/api';

export function useEventRSVPs(eventId: string) {
  const [loading, setLoading] = useState(false);

  const getRSVPs = async (): Promise<RSVP[]> => {
    try {
      setLoading(true);
      const response = await api.get<RSVP[]>(`/api/events/${eventId}/rsvps`);
      
      if (!response.ok) throw new Error(response.error);
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRSVPCount = async (): Promise<number> => {
    try {
      const response = await api.get<{ count: number }>(`/api/events/${eventId}/rsvps/count`);
      
      if (!response.ok) throw new Error(response.error);
      return response.data?.count ?? 0;
    } catch (error) {
      console.error('Error fetching RSVP count:', error);
      return 0;
    }
  };

  return {
    loading,
    getRSVPs,
    getRSVPCount,
  };
}