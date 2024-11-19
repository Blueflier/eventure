import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  TicketType,
  TicketPricing,
  TicketWithPricing,
  CreateTicketTypeRequest,
  UpdateTicketPricingRequest,
} from '../types/Ticket';

export function useTickets(eventId: string) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const createTicketType = async (request: CreateTicketTypeRequest): Promise<TicketType | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/tickets`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) throw new Error('Failed to create ticket type');
      return await response.json();
    } catch (error) {
      console.error('Error creating ticket type:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTicketPricing = async (
    ticketTypeId: string,
    pricingId: string,
    request: UpdateTicketPricingRequest
  ): Promise<TicketPricing | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/tickets/${ticketTypeId}/pricing/${pricingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) throw new Error('Failed to update ticket pricing');
      return await response.json();
    } catch (error) {
      console.error('Error updating ticket pricing:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getEventTickets = async (): Promise<TicketWithPricing[]> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/tickets`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch event tickets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching event tickets:', error);
      return [];
    }
  };

  const deleteTicketType = async (ticketTypeId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/tickets/${ticketTypeId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error deleting ticket type:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTicketType,
    updateTicketPricing,
    getEventTickets,
    deleteTicketType,
  };
}