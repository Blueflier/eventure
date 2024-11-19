import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { TicketPurchase } from '../../types/TicketPurchase';
import { Button } from '../common/Button';

interface Props {
  purchase: TicketPurchase;
}

export function TicketPurchaseCard({ purchase }: Props) {
  const navigation = useNavigation();

  const getStatusColor = () => {
    switch (purchase.status) {
      case 'completed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'failed':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const handleViewQR = () => {
    navigation.navigate('TicketQR', { purchaseId: purchase.ticket_purchase_id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{purchase.status}</Text>
        </View>
        <Text style={styles.date}>
          {format(new Date(purchase.purchased_at), 'PPp')}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.quantity}>{purchase.quantity} tickets</Text>
        <Text style={styles.price}>${purchase.total_price.toFixed(2)}</Text>
      </View>

      {purchase.status === 'completed' && (
        <View style={styles.footer}>
          <Text style={styles.confirmationText}>
            Order ID: {purchase.ticket_purchase_id}
          </Text>
          <Button
            title="View QR Code"
            onPress={handleViewQR}
            variant="outline"
            style={styles.qrButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  confirmationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  qrButton: {
    marginTop: 8,
  },
});