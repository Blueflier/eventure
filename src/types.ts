export interface Event {
  event_id: string;
  title: string;
  description: string;
  location_text: string;
  location_address: string;
  latitude: number;
  longitude: number;
  start_time: string;
  end_time: string;
  tags: string[];
  organizer_id: string;
  visibility: boolean;
  created_at: string;
  max_attendees: number;
  event_status: 'draft' | 'published' | 'scheduled' | 'cancelled' | 'completed';
  approval_status: 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  featured_until: string | null;
  requires_ticket: boolean;
  scheduled_publish_date: string | null;
  images?: string[];
  price?: number;
}

export interface UserProfile {
  user_id: string;
  email: string;
  name: string;
  profile_picture: string | null;
  bio: string;
  community_affiliation: string;
  created_at: string;
  two_factor_enabled: boolean;
  average_rating: number;
  roles?: Role[];
}

export interface Role {
  role_id: string;
  role_name: string;
}

export interface Wallet {
  wallet_id: string;
  user_id: string;
  balance: number;
  currency: string;
}

export interface Transaction {
  transaction_id: string;
  wallet_id: string;
  amount: number;
  transaction_type: 'credit' | 'debit';
  description: string;
  created_at: string;
  stripe_payment_intent_id?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'reminder' | 'update' | 'message' | 'promotion';
  read: boolean;
  data?: {
    eventId?: string;
    [key: string]: any;
  };
  createdAt: string;
}

export interface TicketType {
  name: string;
  price: number;
  quantity: number;
  description: string;
  earlyBirdDeadline: string | null;
  earlyBirdPrice: number | null;
}

export interface UserSettings {
  user_id: string;
  notification_preferences: {
    events: boolean;
    messages: boolean;
    updates: boolean;
    marketing: boolean;
  };
  theme_preference: 'light' | 'dark' | 'system';
  language_preference: string;
  privacy_settings: {
    profile_visibility: boolean;
    show_email: boolean;
    allow_messages: boolean;
  };
  created_at: string;
  updated_at: string;
}