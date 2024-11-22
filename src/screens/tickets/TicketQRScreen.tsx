import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TicketQRDisplay } from '../../components/tickets/TicketQRDisplay';
import { useTicketQR } from '../../hooks/useTicketQR';
import { TicketQR } from '../../types/TicketQR';

export default function TicketQRScreen() {
  const route = useRoute();
  const purchaseId = route.params?.purchaseId;
  const [qrCodes, setQRCodes] = useState<TicketQR[]>([]);
  const { getTicketQRs, generateQRCode, loading } = useTicketQR();

  useEffect(() => {
    fetchQRCodes();
  }, [purchaseId]);

  const fetchQRCodes = async () => {
    const codes = await getTicketQRs(purchaseId);
    if (codes.length === 0) {
      const newQR = await generateQRCode(purchaseId);
      if (newQR) {
        setQRCodes([newQR]);
      }
    } else {
      setQRCodes(codes);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={36} color="#2e6ddf" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TicketQRDisplay qrCodes={qrCodes} onRefresh={fetchQRCodes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});