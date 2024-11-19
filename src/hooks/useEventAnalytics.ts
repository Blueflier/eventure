import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EventAnalytics, AnalyticsOverview } from '../types/EventAnalytics';

export function useEventAnalytics(eventId: string) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const getAnalytics = async (): Promise<AnalyticsOverview | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/analytics`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (): Promise<void> => {
    try {
      await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/analytics/view`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getAnalyticsTrends = async (days: number = 7) => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/analytics/trends?days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch analytics trends');
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics trends:', error);
      return [];
    }
  };

  return {
    loading,
    getAnalytics,
    trackView,
    getAnalyticsTrends,
  };
}