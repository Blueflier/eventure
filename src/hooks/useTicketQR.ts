import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TicketQR, QRScanResult } from '../types/TicketQR';

export function useTicketQR() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const generateQRCode = async (purchaseId: string): Promise<TicketQR | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/tickets/purchases/${purchaseId}/qr`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to generate QR code');
      return await response.json();
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
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/tickets/validate-qr',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ qr_code: qrCode }),
        }
      );

      const data = await response.json();
      return {
        success: response.ok,
        message: data.message,
        ticketQR: data.ticketQR,
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
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/tickets/purchases/${purchaseId}/qr-codes`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch QR codes');
      return await response.json();
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