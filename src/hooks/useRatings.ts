import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Rating, RatingStats } from '../types/Rating';
import { api } from '../utils/api';

export function useRatings(organizerId: string) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<RatingStats>({
    averageRating: 0,
    totalRatings: 0,
    ratingDistribution: {},
  });

  const submitRating = async (rating: number, comment: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.post<void>(
        `/api/organizers/${organizerId}/ratings`,
        { rating, comment }
      );
      
      if (!response.ok) throw new Error(response.error);
      await fetchRatingStats();
      return true;
    } catch (error) {
      console.error('Error submitting rating:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingStats = async () => {
    try {
      const response = await api.get<RatingStats>(
        `/api/organizers/${organizerId}/ratings/stats`
      );
      
      if (!response.ok) throw new Error(response.error);
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching rating stats:', error);
    }
  };

  const getUserRating = async (): Promise<Rating | null> => {
    try {
      const response = await api.get<{ rating: Rating }>(
        `/api/organizers/${organizerId}/ratings/user`
      );
      
      if (!response.ok) throw new Error(response.error);
      return response.data?.rating || null;
    } catch (error) {
      console.error('Error fetching user rating:', error);
      return null;
    }
  };

  return {
    loading,
    stats,
    submitRating,
    fetchRatingStats,
    getUserRating,
  };
}