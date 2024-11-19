export interface Attendance {
  user_id: string;
  event_id: string;
  scanned_at: string;
}

export interface AttendanceStats {
  total: number;
  scanned: number;
  percentage: number;
}