import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  totalRSVPs: number;
  maxAttendees?: number;
}

export function RSVPStats({ totalRSVPs, maxAttendees }: Props) {
  const getAvailabilityColor = () => {
    if (!maxAttendees) return '#2e6ddf';
    const ratio = totalRSVPs / maxAttendees;
    if (ratio >= 1) return '#f44336';
    if (ratio >= 0.8) return '#ff9800';
    return '#4caf50';
  };

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Ionicons name="people-outline" size={24} color={getAvailabilityColor()} />
        <Text style={styles.count}>{totalRSVPs}</Text>
        <Text style={styles.label}>RSVPs</Text>
      </View>
      {maxAttendees && (
        <View style={styles.stat}>
          <Ionicons name="alert-circle-outline" size={24} color={getAvailabilityColor()} />
          <Text style={styles.count}>{maxAttendees - totalRSVPs}</Text>
          <Text style={styles.label}>Spots Left</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  stat: {
    alignItems: 'center',
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
});