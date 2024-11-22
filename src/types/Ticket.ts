export interface TicketType {
  ticket_type_id: string;
  event_id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface TicketPricing {
  ticket_pricing_id: string;
  ticket_type_id: string;
  price: number;
  start_time: string;
  end_time: string;
  quantity_available: number;
  created_at: string;
}

export interface TicketWithPricing extends TicketType {
  pricing: TicketPricing[];
  currentPrice: number;
  availableQuantity: number;
}

export interface CreateTicketTypeRequest {
  name: string;
  description: string;
  pricing: {
    price: number;
    start_time: string;
    end_time: string;
    quantity_available: number;
  }[];
}

export interface UpdateTicketPricingRequest {
  price: number;
  start_time: string;
  end_time: string;
  quantity_available: number;
}