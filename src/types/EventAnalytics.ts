export interface EventAnalytics {
  analytics_id: string;
  event_id: string;
  views_count: number;
  rsvp_count: number;
  attendance_count: number;
  engagement_score: number;
  updated_at: string;
}

export interface AnalyticsTrend {
  date: string;
  views: number;
  rsvps: number;
  attendance: number;
}

export interface AnalyticsOverview {
  current: EventAnalytics;
  trends: AnalyticsTrend[];
  conversionRate: number;
  attendanceRate: number;
}