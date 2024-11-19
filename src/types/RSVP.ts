export interface RSVP {
  rsvp_id: string;
  event_id: string;
  user_id: string;
  rsvp_time: string;
}

export interface RSVPResponse {
  success: boolean;
  message: string;
  rsvp?: RSVP;
}