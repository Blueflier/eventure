import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Rating, RatingStats } from '../types/Rating';

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
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/organizers/${organizerId}/ratings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (!response.ok) throw new Error('Failed to submit rating');
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
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/organizers/${organizerId}/ratings/stats`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch rating stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching rating stats:', error);
    }
  };

  const getUserRating = async (): Promise<Rating | null> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/organizers/${organizerId}/ratings/user`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch user rating');
      const data = await response.json();
      return data.rating;
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