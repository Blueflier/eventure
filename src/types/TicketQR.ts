export interface TicketQR {
  ticket_qr_id: string;
  ticket_purchase_id: string;
  qr_code: string;
  used: boolean;
  used_at: string | null;
  created_at: string;
}

export interface QRScanResult {
  success: boolean;
  message: string;
  ticketQR?: TicketQR;
}