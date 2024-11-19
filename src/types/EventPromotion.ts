export interface EventPromotion {
  promotion_id: string;
  event_id: string;
  user_id: string;
  promotion_type: PromotionType;
  start_date: string;
  end_date: string;
  cost_in_currency: number;
  created_at: string;
  transaction_id?: string;
}

export type PromotionType = 'featured' | 'sponsored' | 'highlighted';

export interface PromotionPackage {
  type: PromotionType;
  duration: number; // in days
  cost: number;
  benefits: string[];
}

export interface CreatePromotionRequest {
  event_id: string;
  promotion_type: PromotionType;
  duration: number;
}