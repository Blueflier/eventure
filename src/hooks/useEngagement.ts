import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EngagementType, EngagementStats } from '../types/Engagement';

export function useEngagement(eventId: string) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<EngagementStats>({
    views: 0,
    rsvps: 0,
    comments: 0,
    shares: 0,
    totalEngagements: 0,
  });

  const trackEngagement = async (type: EngagementType): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/engagements`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ type }),
        }
      );

      if (!response.ok) throw new Error('Failed to track engagement');
      await fetchEngagementStats();
      return true;
    } catch (error) {
      console.error('Error tracking engagement:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchEngagementStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/engagements/stats`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch engagement stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching engagement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserEngagements = async (): Promise<EngagementType[]> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/engagements/user`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch user engagements');
      const data = await response.json();
      return data.engagements.map((e: any) => e.type);
    } catch (error) {
      console.error('Error fetching user engagements:', error);
      return [];
    }
  };

  const getEngagementHistory = async (type?: EngagementType) => {
    try {
      const queryParams = type ? `?type=${type}` : '';
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/engagements/history${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch engagement history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching engagement history:', error);
      return [];
    }
  };

  return {
    loading,
    stats,
    trackEngagement,
    fetchEngagementStats,
    getUserEngagements,
    getEngagementHistory,
  };
}