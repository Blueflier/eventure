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