import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TicketPurchase, CreateTicketPurchaseRequest, TicketPurchaseResponse } from '../types/TicketPurchase';
import { useStripe } from '@stripe/stripe-react-native';

export function useTicketPurchase() {
  const { session } = useAuth();
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const purchaseTickets = async (request: CreateTicketPurchaseRequest): Promise<TicketPurchaseResponse | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/tickets/purchase',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) throw new Error('Failed to create ticket purchase');
      return await response.json();
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
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/tickets/purchases',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch ticket purchases');
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticket purchases:', error);
      return [];
    }
  };

  const getPurchaseDetails = async (purchaseId: string): Promise<TicketPurchase | null> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/tickets/purchases/${purchaseId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch purchase details');
      return await response.json();
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