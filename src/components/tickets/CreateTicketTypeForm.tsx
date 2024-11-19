import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { DateTimePicker } from '../common/DateTimePicker';
import { CreateTicketTypeRequest } from '../../types/Ticket';

interface Props {
  onSubmit: (data: CreateTicketTypeRequest) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function CreateTicketTypeForm({ onSubmit, onCancel, loading }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity_available: '',
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
  });

  const handleSubmit = () => {
    onSubmit({
      name: formData.name,
      description: formData.description,
      pricing: [
        {
          price: parseFloat(formData.price),
          quantity_available: parseInt(formData.quantity_available),
          start_date: formData.start_date,
          end_date: formData.end_date,
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Input
        label="Ticket Name"
        value={formData.name}
        onChangeText={(name) => setFormData({ ...formData, name })}
        placeholder="e.g., General Admission, VIP"
      />

      <Input
        label="Description"
        value={formData.description}
        onChangeText={(description) => setFormData({ ...formData, description })}
        multiline
        numberOfLines={3}
        placeholder="Describe what's included with this ticket"
      />

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
        label="Valid From"
        value={new Date(formData.start_date)}
        onChange={(date) =>
          setFormData({ ...formData, start_date: date.toISOString() })
        }
      />

      <DateTimePicker
        label="Valid Until"
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
          title="Create Ticket Type"
          onPress={handleSubmit}
          loading={loading}
          style={styles.button}
          disabled={!formData.name || !formData.price || !formData.quantity_available}
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
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
});