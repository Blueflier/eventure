export interface BlockedUser {
  blocker_user_id: string;
  blocked_user_id: string;
  blocked_at: string;
}

export interface BlockUserResponse {
  success: boolean;
  message: string;
}