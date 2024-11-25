import { useState } from 'react';
import { api } from '../utils/api';
import { EventPromotion, CreatePromotionRequest, PromotionPackage } from '../types/EventPromotion';

export function useEventPromotion() {
  const [loading, setLoading] = useState(false);

  const getPromotionPackages = async (): Promise<PromotionPackage[]> => {
    const response = await api.get<PromotionPackage[]>('/api/promotions/packages');
    if (!response.ok) {
      console.error('Error fetching promotion packages:', response.error);
      return [];
    }
    return response.data ?? [];
  };

  const createPromotion = async (request: CreatePromotionRequest): Promise<EventPromotion | null> => {
    try {
      setLoading(true);
      const response = await api.post<EventPromotion>('/api/promotions', request);
      if (!response.ok) {
        console.error('Error creating promotion:', response.error);
        return null;
      }
      return response.data ?? null;
    } finally {
      setLoading(false);
    }
  };

  const getActivePromotions = async (eventId: string): Promise<EventPromotion[]> => {
    const response = await api.get<EventPromotion[]>(`/api/events/${eventId}/promotions`);
    if (!response.ok) {
      console.error('Error fetching active promotions:', response.error);
      return [];
    }
    return response.data ?? [];
  };

  const cancelPromotion = async (promotionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.delete(`/api/promotions/${promotionId}`);
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