import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { TicketWithPricing } from '../../types/Ticket';
import { PurchaseTicketModal } from './PurchaseTicketModal';

interface Props {
  ticket: TicketWithPricing;
  onPurchaseComplete?: () => void;
}

export function PurchaseButton({ ticket, onPurchaseComplete }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSuccess = () => {
    onPurchaseComplete?.();
  };

  return (
    <>
      <Button
        title={`Purchase - $${ticket.currentPrice.toFixed(2)}`}
        onPress={() => setModalVisible(true)}
        disabled={ticket.availableQuantity === 0}
        style={styles.button}
      />

      <PurchaseTicketModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        ticket={ticket}
        onSuccess={handleSuccess}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
  },
});