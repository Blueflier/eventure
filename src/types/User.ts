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