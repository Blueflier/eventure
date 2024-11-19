import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Button } from '../common/Input';
import { Input } from '../common/Input';
import { TicketWithPricing } from '../../types/Ticket';
import { useTicketPurchase } from '../../hooks/useTicketPurchase';

interface Props {
  visible: boolean;
  onClose: () => void;
  ticket: TicketWithPricing;
  onSuccess: () => void;
}

export function PurchaseTicketModal({
  visible,
  onClose,
  ticket,
  onSuccess,
}: Props) {
  const [quantity, setQuantity] = useState('1');
  const [cardComplete, setCardComplete] = useState(false);
  const { purchaseTickets, confirmPayment, loading } = useTicketPurchase();

  const handlePurchase = async () => {
    const qty = parseInt(quantity);
    if (qty < 1 || qty > ticket.availableQuantity) return;

    const purchaseResponse = await purchaseTickets({
      ticket_type_id: ticket.ticket_type_id,
      quantity: qty,
    });

    if (!purchaseResponse) return;

    const success = await confirmPayment(purchaseResponse.client_secret);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  const totalPrice = parseFloat(quantity) * ticket.currentPrice;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Purchase Tickets</Text>

          <View style={styles.ticketInfo}>
            <Text style={styles.ticketName}>{ticket.name}</Text>
            <Text style={styles.price}>${ticket.currentPrice.toFixed(2)} each</Text>
          </View>

          <Input
            label="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.quantityInput}
          />

          <CardField
            postalCodeEnabled={false}
            onCardChange={(cardDetails) => {
              setCardComplete(cardDetails.complete);
            }}
            style={styles.cardField}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              style={styles.button}
            />
            <Button
              title="Purchase"
              onPress={handlePurchase}
              loading={loading}
              disabled={!cardComplete || loading || totalPrice <= 0}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ticketInfo: {
    marginBottom: 20,
  },
  ticketName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#2e6ddf',
  },
  quantityInput: {
    marginBottom: 20,
  },
  cardField: {
    height: 50,
    marginBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
  },
});