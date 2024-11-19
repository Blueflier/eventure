export interface Rating {
  rating_id: string;
  organizer_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    [key: number]: number;
  };
}