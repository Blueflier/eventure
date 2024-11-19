import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { format } from 'date-fns';
import { TicketQR } from '../../types/TicketQR';

interface Props {
  qrCodes: TicketQR[];
  onRefresh: () => void;
}

export function TicketQRDisplay({ qrCodes, onRefresh }: Props) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    >
      {qrCodes.map((qr) => (
        <View key={qr.ticket_qr_id} style={styles.qrContainer}>
          <QRCode value={qr.qr_code} size={200} />
          
          <View style={styles.info}>
            <Text style={styles.status}>
              {qr.used ? 'Used' : 'Valid'}
            </Text>
            {qr.used && qr.used_at && (
              <Text style={styles.usedAt}>
                Used on {format(new Date(qr.used_at), 'PPp')}
              </Text>
            )}
            <Text style={styles.created}>
              Generated on {format(new Date(qr.created_at), 'PPp')}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  qrContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  info: {
    marginTop: 20,
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e6ddf',
    marginBottom: 8,
  },
  usedAt: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  created: {
    fontSize: 12,
    color: '#999',
  },
});