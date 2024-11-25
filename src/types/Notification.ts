export interface Notification {
  notification_id: string;
  user_id: string;
  type: NotificationType;
  content: string;
  related_id: string;
  related_type: RelatedType;
  priority: NotificationPriority;
  read_status: boolean;
  created_at: string;
  expires_at?: string;
}

export type NotificationType = 'message' | 'event_update' | 'rsvp_confirmation' | 'event_reminder' | 'event_cancelled';
export type RelatedType = 'event' | 'message' | 'user';
export type NotificationPriority = 'high' | 'normal';

export interface NotificationSettings {
  pushEnabled: boolean;
  reminderNotifications: boolean;
  updateNotifications: boolean;
  messageNotifications: boolean;
  promotionNotifications: boolean;
}