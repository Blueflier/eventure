export interface ModerationLog {
  moderation_id: string;
  moderator_id: string;
  action_type: ModerationActionType;
  target_id: string;
  target_type: TargetType;
  reason: string;
  created_at: string;
}

export type ModerationActionType = 
  | 'approve_event'
  | 'reject_event'
  | 'suspend_user'
  | 'unsuspend_user'
  | 'remove_content'
  | 'restore_content';

export type TargetType = 'event' | 'user' | 'comment';

export interface Report {
  report_id: string;
  reporter_id: string;
  target_id: string;
  target_type: TargetType;
  reason: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export type ReportStatus = 'pending' | 'reviewed' | 'dismissed';

export interface ModerationStats {
  pendingReports: number;
  totalReports: number;
  actionsToday: number;
  recentActions: ModerationLog[];
}