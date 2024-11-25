import { useState } from 'react';
import { EventAnalytics, AnalyticsOverview } from '../types/EventAnalytics';
import { api } from '../utils/api';

export function useEventAnalytics(eventId: string) {
  const [loading, setLoading] = useState(false);

  const getAnalytics = async (): Promise<AnalyticsOverview | null> => {
    try {
      setLoading(true);
      const response = await api.get<AnalyticsOverview>(`/events/${eventId}/analytics`);
      
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.data || null;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (): Promise<void> => {
    try {
      const response = await api.post(`/events/${eventId}/analytics/view`);
      if (!response.ok) throw new Error('Failed to track view');
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const getAnalyticsTrends = async (days: number = 7) => {
    try {
      const response = await api.get(`/events/${eventId}/analytics/trends?days=${days}`);
      
      if (!response.ok) throw new Error('Failed to fetch analytics trends');
      return response.data || [];
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