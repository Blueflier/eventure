import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { EventRecurrence } from '../../types/Event';

interface Props {
  recurrence: EventRecurrence;
}

export function RecurrenceInfo({ recurrence }: Props) {
  const getRecurrenceText = () => {
    const interval = recurrence.recurrence_interval;
    const pattern = recurrence.recurrence_pattern;
    
    let text = `Repeats every ${interval} `;
    text += interval === 1 ? pattern.slice(0, -2) : pattern;
    text += ` until ${format(new Date(recurrence.recurrence_end_date), 'PP')}`;
    
    return text;
  };

  return (
    <View style={styles.container}>
      <Ionicons name="repeat" size={20} color="#666" />
      <Text style={styles.text}>{getRecurrenceText()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});