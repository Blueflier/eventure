import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Button } from '../common/Button';
import { TicketPricingForm } from './TicketPricingForm';
import { TicketWithPricing, UpdateTicketPricingRequest } from '../../types/Ticket';
import { useTickets } from '../../hooks/useTickets';

interface Props {
  ticket: TicketWithPricing;
  onUpdate: () => void;
  isOrganizer?: boolean;
}

export function TicketTypeCard({ ticket, onUpdate, isOrganizer }: Props) {
  const [showPricingForm, setShowPricingForm] = useState(false);
  const { updateTicketPricing, loading } = useTickets(ticket.event_id);

  const handlePricingUpdate = async (data: UpdateTicketPricingRequest) => {
    const currentPricing = ticket.pricing[0];
    if (currentPricing) {
      const success = await updateTicketPricing(
        ticket.ticket_type_id,
        currentPricing.ticket_pricing_id,
        data
      );
      if (success) {
        onUpdate();
        setShowPricingForm(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{ticket.name}</Text>
      <Text style={styles.description}>{ticket.description}</Text>

      <View style={styles.pricingInfo}>
        <Text style={styles.price}>${ticket.currentPrice.toFixed(2)}</Text>
        <Text style={styles.quantity}>
          {ticket.availableQuantity} tickets available
        </Text>
      </View>

      {ticket.pricing[0] && (
        <Text style={styles.validity}>
          Valid from {format(new Date(ticket.pricing[0].start_date), 'PPP')} to{' '}
          {format(new Date(ticket.pricing[0].end_date), 'PPP')}
        </Text>
      )}

      {isOrganizer && (
        <View style={styles.actions}>
          <Button
            title={showPricingForm ? 'Cancel' : 'Update Pricing'}
            onPress={() => setShowPricingForm(!showPricingForm)}
            variant="outline"
          />
        </View>
      )}

      {showPricingForm && (
        <View style={styles.formContainer}>
          <TicketPricingForm
            initialData={ticket.pricing[0]}
            onSubmit={handlePricingUpdate}
            onCancel={() => setShowPricingForm(false)}
            loading={loading}
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  pricingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  validity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  actions: {
    marginTop: 12,
  },
  formContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});