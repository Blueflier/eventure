import { useState } from 'react';
import { api } from '../utils/api';
import {
  TicketType,
  TicketPricing,
  TicketWithPricing,
  CreateTicketTypeRequest,
  UpdateTicketPricingRequest,
} from '../types/Ticket';

export function useTickets(eventId: string) {
  const [loading, setLoading] = useState(false);

  const createTicketType = async (request: CreateTicketTypeRequest): Promise<TicketType | null> => {
    try {
      setLoading(true);
      const response = await api.post<TicketType>(`/api/events/${eventId}/tickets`, request);
      
      if (!response.ok) throw new Error(response.error);
      return response.data ?? null;
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
      const response = await api.put<TicketPricing>(
        `/api/tickets/${ticketTypeId}/pricing/${pricingId}`,
        request
      );
      
      if (!response.ok) throw new Error(response.error);
      return response.data ?? null;
    } catch (error) {
      console.error('Error updating ticket pricing:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getEventTickets = async (): Promise<TicketWithPricing[]> => {
    try {
      const response = await api.get<TicketWithPricing[]>(`/api/events/${eventId}/tickets`);
      
      if (!response.ok) throw new Error(response.error);
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching event tickets:', error);
      return [];
    }
  };

  const deleteTicketType = async (ticketTypeId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.delete(`/api/tickets/${ticketTypeId}`);
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