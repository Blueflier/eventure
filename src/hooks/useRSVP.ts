import { useState } from 'react';
import { api } from '../utils/api';
import { RSVP, RSVPResponse } from '../types/RSVP';

export function useRSVP() {
  const [loading, setLoading] = useState(false);

  const checkRSVPStatus = async (eventId: string): Promise<RSVP | null> => {
    const response = await api.get<{ rsvp: RSVP }>(`/events/${eventId}/rsvp-status`);
    return response.ok && response.data ? response.data.rsvp : null;
  };

  const handleRSVP = async (eventId: string): Promise<RSVPResponse> => {
    try {
      setLoading(true);
      const response = await api.post<RSVPResponse>(`/events/${eventId}/rsvp`);
      return response.ok && response.data ? response.data : {
        success: false,
        message: response.error || 'Failed to RSVP. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const cancelRSVP = async (eventId: string): Promise<RSVPResponse> => {
    try {
      setLoading(true);
      const response = await api.delete<RSVPResponse>(`/events/${eventId}/rsvp`);
      return response.ok && response.data ? response.data : {
        success: false,
        message: response.error || 'Failed to cancel RSVP. Please try again.',
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