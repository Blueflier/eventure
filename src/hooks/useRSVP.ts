import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RSVP, RSVPResponse } from '../types/RSVP';

export function useRSVP() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const checkRSVPStatus = async (eventId: string): Promise<RSVP | null> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/rsvp-status`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const data = await response.json();
      return data.rsvp || null;
    } catch (error) {
      console.error('Error checking RSVP status:', error);
      return null;
    }
  };

  const handleRSVP = async (eventId: string): Promise<RSVPResponse> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/rsvp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to RSVP. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const cancelRSVP = async (eventId: string): Promise<RSVPResponse> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/rsvp`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to cancel RSVP. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checkRSVPStatus,
    handleRSVP,
    cancelRSVP,
  };
}