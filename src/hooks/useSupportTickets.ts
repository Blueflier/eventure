import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SupportTicket, CreateTicketRequest } from '../types/SupportTicket';

export function useSupportTickets() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const createTicket = async (request: CreateTicketRequest): Promise<SupportTicket | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/support-tickets',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) throw new Error('Failed to create support ticket');
      return await response.json();
    } catch (error) {
      console.error('Error creating support ticket:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserTickets = async (): Promise<SupportTicket[]> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/support-tickets',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch support tickets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTicketDetails = async (ticketId: string): Promise<SupportTicket | null> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/support-tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch ticket details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching ticket details:', error);
      return null;
    }
  };

  return {
    loading,
    createTicket,
    getUserTickets,
    getTicketDetails,
  };
}