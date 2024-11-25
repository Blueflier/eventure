import { useState } from 'react';
import { api } from '../utils/api';
import { TicketQR, QRScanResult } from '../types/TicketQR';

export function useTicketQR() {
  const [loading, setLoading] = useState(false);

  const generateQRCode = async (purchaseId: string): Promise<TicketQR | null> => {
    try {
      setLoading(true);
      const response = await api.post<TicketQR>(`/api/tickets/purchases/${purchaseId}/qr`);
      
      if (!response.ok) throw new Error('Failed to generate QR code');
      return response.data ?? null;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const validateQRCode = async (qrCode: string): Promise<QRScanResult> => {
    try {
      setLoading(true);
      const response = await api.post<{ message: string; ticketQR: TicketQR }>(
        '/api/tickets/validate-qr',
        { qr_code: qrCode }
      );

      return {
        success: response.ok,
        message: response.data?.message ?? 'Failed to validate QR code',
        ticketQR: response.data?.ticketQR,
      };
    } catch (error) {
      console.error('Error validating QR code:', error);
      return {
        success: false,
        message: 'Failed to validate QR code',
      };
    } finally {
      setLoading(false);
    }
  };

  const getTicketQRs = async (purchaseId: string): Promise<TicketQR[]> => {
    try {
      const response = await api.get<TicketQR[]>(`/api/tickets/purchases/${purchaseId}/qr-codes`);
      
      if (!response.ok) throw new Error('Failed to fetch QR codes');
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching QR codes:', error);
      return [];
    }
  };

  return {
    loading,
    generateQRCode,
    validateQRCode,
    getTicketQRs,
  };
}