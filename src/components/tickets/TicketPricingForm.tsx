import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { DateTimePicker } from '../common/DateTimePicker';
import { UpdateTicketPricingRequest } from '../../types/Ticket';

interface Props {
  initialData?: {
    price: number;
    start_date: string;
    end_date: string;
    quantity_available: number;
  };
  onSubmit: (data: UpdateTicketPricingRequest) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function TicketPricingForm({
  initialData,
  onSubmit,
  onCancel,
  loading,
}: Props) {
  const [formData, setFormData] = useState({
    price: initialData?.price.toString() || '',
    start_date: initialData?.start_date || new Date().toISOString(),
    end_date: initialData?.end_date || new Date().toISOString(),
    quantity_available: initialData?.quantity_available.toString() || '',
  });

  const handleSubmit = () => {
    onSubmit({
      price: parseFloat(formData.price),
      start_date: formData.start_date,
      end_date: formData.end_date,
      quantity_available: parseInt(formData.quantity_available),
    });
  };

  return (
    <View style={styles.container}>
      <Input
        label="Price"
        value={formData.price}
        onChangeText={(price) => setFormData({ ...formData, price })}
        keyboardType="numeric"
        placeholder="0.00"
      />

      <Input
        label="Quantity Available"
        value={formData.quantity_available}
        onChangeText={(quantity) =>
          setFormData({ ...formData, quantity_available: quantity })
        }
        keyboardType="numeric"
        placeholder="0"
      />

      <DateTimePicker
        label="Start Date"
        value={new Date(formData.start_date)}
        onChange={(date) =>
          setFormData({ ...formData, start_date: date.toISOString() })
        }
      />

      <DateTimePicker
        label="End Date"
        value={new Date(formData.end_date)}
        onChange={(date) =>
          setFormData({ ...formData, end_date: date.toISOString() })
        }
        minimumDate={new Date(formData.start_date)}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={onCancel}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Save"
          onPress={handleSubmit}
          loading={loading}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});