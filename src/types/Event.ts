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
  images: EventImage[];
  price?: number;
  recurrence?: EventRecurrence;
}

export interface EventImage {
  image_id: string;
  event_id: string;
  image_url: string;
  created_at: string;
}

export interface EventRecurrence {
  recurrence_id: string;
  event_id: string;
  recurrence_pattern: 'daily' | 'weekly' | 'monthly';
  recurrence_interval: number;
  recurrence_end_date: string;
}