import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TicketPurchase, CreateTicketPurchaseRequest, TicketPurchaseResponse } from '../types/TicketPurchase';
import { useStripe } from '@stripe/stripe-react-native';
import { api } from '../utils/api';

export function useTicketPurchase() {
  const { session } = useAuth();
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const purchaseTickets = async (request: CreateTicketPurchaseRequest): Promise<TicketPurchaseResponse | null> => {
    try {
      setLoading(true);
      const response = await api.post<TicketPurchaseResponse>('/api/tickets/purchase', request);
      if (!response.ok) throw new Error(response.error || 'Failed to create ticket purchase');
      return response.data || null;
    } catch (error) {
      console.error('Error purchasing tickets:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (clientSecret: string): Promise<boolean> => {
    try {
      const { error } = await stripe.confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error confirming payment:', error);
      return false;
    }
  };

  const getUserPurchases = async (): Promise<TicketPurchase[]> => {
    try {
      const response = await api.get<TicketPurchase[]>('/api/tickets/purchases');
      if (!response.ok) throw new Error(response.error || 'Failed to fetch ticket purchases');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching ticket purchases:', error);
      return [];
    }
  };

  const getPurchaseDetails = async (purchaseId: string): Promise<TicketPurchase | null> => {
    try {
      const response = await api.get<TicketPurchase>(`/api/tickets/purchases/${purchaseId}`);
      if (!response.ok) throw new Error(response.error || 'Failed to fetch purchase details');
      return response.data || null;
    } catch (error) {
      console.error('Error fetching purchase details:', error);
      return null;
    }
  };

  return {
    loading,
    purchaseTickets,
    confirmPayment,
    getUserPurchases,
    getPurchaseDetails,
  };
}