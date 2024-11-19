export type EngagementType = 'view' | 'rsvp' | 'comment' | 'share';

export interface Engagement {
  engagement_id: string;
  event_id: string;
  user_id: string;
  type: EngagementType;
  created_at: string;
}

export interface EngagementStats {
  views: number;
  rsvps: number;
  comments: number;
  shares: number;
  totalEngagements: number;
}