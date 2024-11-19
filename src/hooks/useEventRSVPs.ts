import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RSVP } from '../types/RSVP';

export function useEventRSVPs(eventId: string) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const getRSVPs = async (): Promise<RSVP[]> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/rsvps`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch RSVPs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRSVPCount = async (): Promise<number> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/rsvps/count`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch RSVP count');
      const data = await response.json();
      return data.count;
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