import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { DateTimePicker } from '../../common/DateTimePicker';
import { TicketType } from '../../../types';

interface Props {
  initialData?: TicketType;
  onSubmit: (ticketType: TicketType) => void;
  onDelete?: () => void;
}

export function TicketTypeForm({ initialData, onSubmit, onDelete }: Props) {
  const [ticketData, setTicketData] = useState<TicketType>(
    initialData || {
      name: '',
      price: 0,
      quantity: 0,
      description: '',
      earlyBirdDeadline: null,
      earlyBirdPrice: null,
    }
  );

  const handleSubmit = () => {
    onSubmit(ticketData);
    if (!initialData) {
      setTicketData({
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        earlyBirdDeadline: null,
        earlyBirdPrice: null,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Ticket Name"
        value={ticketData.name}
        onChangeText={(name) => setTicketData({ ...ticketData, name })}
        placeholder="e.g., General Admission, VIP"
      />

      <Input
        label="Price"
        value={ticketData.price.toString()}
        onChangeText={(price) =>
          setTicketData({ ...ticketData, price: parseFloat(price) || 0 })
        }
        keyboardType="numeric"
        placeholder="0.00"
      />

      <Input
        label="Quantity Available"
        value={ticketData.quantity.toString()}
        onChangeText={(quantity) =>
          setTicketData({ ...ticketData, quantity: parseInt(quantity) || 0 })
        }
        keyboardType="numeric"
        placeholder="0"
      />

      <Input
        label="Description"
        value={ticketData.description}
        onChangeText={(description) =>
          setTicketData({ ...ticketData, description })
        }
        multiline
        numberOfLines={3}
        placeholder="Describe what's included with this ticket"
      />

      <View style={styles.earlyBirdContainer}>
        <Input
          label="Early Bird Price"
          value={ticketData.earlyBirdPrice?.toString()}
          onChangeText={(price) =>
            setTicketData({
              ...ticketData,
              earlyBirdPrice: parseFloat(price) || null,
            })
          }
          keyboardType="numeric"
          placeholder="0.00"
        />

        {ticketData.earlyBirdPrice && (
          <DateTimePicker
            label="Early Bird Deadline"
            value={
              ticketData.earlyBirdDeadline
                ? new Date(ticketData.earlyBirdDeadline)
                : new Date()
            }
            onChange={(date) =>
              setTicketData({
                ...ticketData,
                earlyBirdDeadline: date.toISOString(),
              })
            }
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        {onDelete && (
          <Button
            title="Delete"
            onPress={onDelete}
            variant="outline"
            style={styles.deleteButton}
          /> <boltAction type="file" filePath="src/components/events/create/TicketTypeForm.tsx">        )}
        <Button
          title={initialData ? 'Update' : 'Add Ticket Type'}
          onPress={handleSubmit}
          disabled={!ticketData.name || ticketData.price < 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  earlyBirdContainer: {
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
});