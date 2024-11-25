import { useState } from 'react';
import { api } from '../utils/api';
import { SupportTicket, CreateTicketRequest } from '../types/SupportTicket';

export function useSupportTickets() {
  const [loading, setLoading] = useState(false);

  const createTicket = async (request: CreateTicketRequest): Promise<SupportTicket | null> => {
    try {
      setLoading(true);
      const response = await api.post<SupportTicket>('/api/support-tickets', request);
      
      if (!response.ok) throw new Error(response.error);
      return response.data || null;
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
      const response = await api.get<SupportTicket[]>('/api/support-tickets');
      
      if (!response.ok) throw new Error(response.error);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching support tickets:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTicketDetails = async (ticketId: string): Promise<SupportTicket | null> => {
    try {
      const response = await api.get<SupportTicket>(`/api/support-tickets/${ticketId}`);
      
      if (!response.ok) throw new Error(response.error);
      return response.data || null;
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