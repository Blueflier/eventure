export interface SupportTicket {
  ticket_id: string;
  user_id: string;
  subject: string;
  message: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
}

export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface CreateTicketRequest {
  subject: string;
  message: string;
}