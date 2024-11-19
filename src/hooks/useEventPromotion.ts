import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EventPromotion, CreatePromotionRequest, PromotionPackage } from '../types/EventPromotion';

export function useEventPromotion() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const getPromotionPackages = async (): Promise<PromotionPackage[]> => {
    try {
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/promotions/packages',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch promotion packages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching promotion packages:', error);
      return [];
    }
  };

  const createPromotion = async (request: CreatePromotionRequest): Promise<EventPromotion | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/promotions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) throw new Error('Failed to create promotion');
      return await response.json();
    } catch (error) {
      console.error('Error creating promotion:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getActivePromotions = async (eventId: string): Promise<EventPromotion[]> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/promotions`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch active promotions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching active promotions:', error);
      return [];
    }
  };

  const cancelPromotion = async (promotionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/promotions/${promotionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error canceling promotion:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getPromotionPackages,
    createPromotion,
    getActivePromotions,
    cancelPromotion,
  };
}