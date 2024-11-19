export interface TicketPurchase {
  ticket_purchase_id: string;
  ticket_type_id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  commission_amount: number;
  stripe_payment_intent_id: string;
  status: TicketPurchaseStatus;
  purchased_at: string;
}

export type TicketPurchaseStatus = 'pending' | 'completed' | 'failed';

export interface CreateTicketPurchaseRequest {
  ticket_type_id: string;
  quantity: number;
}

export interface TicketPurchaseResponse {
  purchase: TicketPurchase;
  client_secret: string;
}