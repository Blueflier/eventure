import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EngagementType, EngagementStats } from '../types/Engagement';
import { api } from '../utils/api';

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
      const response = await api.post(`/events/${eventId}/engagements`, { type });
      
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
      const response = await api.get<EngagementStats>(`/events/${eventId}/engagements/stats`);
      
      if (!response.ok) throw new Error('Failed to fetch engagement stats');
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching engagement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserEngagements = async (): Promise<EngagementType[]> => {
    try {
      const response = await api.get<{ engagements: any[] }>(`/events/${eventId}/engagements/user`);
      
      if (!response.ok) throw new Error('Failed to fetch user engagements');
      return response.data?.engagements.map(e => e.type) || [];
    } catch (error) {
      console.error('Error fetching user engagements:', error);
      return [];
    }
  };

  const getEngagementHistory = async (type?: EngagementType) => {
    try {
      const queryParams = type ? `?type=${type}` : '';
      const response = await api.get(`/events/${eventId}/engagements/history${queryParams}`);
      
      if (!response.ok) throw new Error('Failed to fetch engagement history');
      return response.data || [];
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