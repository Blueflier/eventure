import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from '../../common/Input';
import { DateTimePicker } from '../../common/DateTimePicker';
import { EventRecurrence } from '../../../types/Event';

interface Props {
  value?: EventRecurrence;
  onChange: (recurrence: EventRecurrence | undefined) => void;
  eventStartDate: string;
}

export function RecurrenceSelector({ value, onChange, eventStartDate }: Props) {
  const handlePatternChange = (pattern: 'daily' | 'weekly' | 'monthly' | 'none') => {
    if (pattern === 'none') {
      onChange(undefined);
      return;
    }

    onChange({
      recurrence_id: value?.recurrence_id || '',
      event_id: value?.event_id || '',
      recurrence_pattern: pattern,
      recurrence_interval: value?.recurrence_interval || 1,
      recurrence_end_time: value?.recurrence_end_time || new Date(eventStartDate).toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Recurrence</Text>
      
      <Picker
        selectedValue={value?.recurrence_pattern || 'none'}
        onValueChange={(pattern: any) => handlePatternChange(pattern)}
        style={styles.picker}
      >
        <Picker.Item label="No Recurrence" value="none" />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>

      {value && (
        <>
          <View style={styles.intervalContainer}>
            <Input
              label="Repeat every"
              value={value.recurrence_interval.toString()}
              onChangeText={(text) =>
                onChange({
                  ...value,
                  recurrence_interval: parseInt(text) || 1,
                })
              }
              keyboardType="numeric"
              style={styles.intervalInput}
            />
            <Text style={styles.intervalText}>
              {value.recurrence_pattern === 'daily'
                ? 'days'
                : value.recurrence_pattern === 'weekly'
                ? 'weeks'
                : 'months'}
            </Text>
          </View>

          <View style={styles.endDateContainer}>
            <Text style={styles.label}>End Date</Text>
            <DateTimePicker
              value={new Date(value.recurrence_end_time)}
              onChange={(date) =>
                onChange({
                  ...value,
                  recurrence_end_time: date.toISOString(),
                })
              }
              minimumDate={new Date(eventStartDate)}
              mode="date"
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  intervalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  intervalInput: {
    width: 80,
    marginRight: 10,
  },
  intervalText: {
    fontSize: 16,
    color: '#666',
  },
  endDateContainer: {
    marginBottom: 16,
  },
});