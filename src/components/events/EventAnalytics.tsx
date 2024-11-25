import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../utils/api';

interface Props {
  eventId: number;
}

interface Analytics {
  views: number;
  rsvps: number;
  ticketsSold: number;
  revenue: number;
}

export function EventAnalytics({ eventId }: Props) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [eventId]);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get<Analytics>(`/events/${eventId}/analytics`);
      if (response.ok && response.data) {
        setAnalytics(response.data);
      } else {
        console.error('Error fetching analytics:', response.error);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  if (!analytics) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Analytics</Text>
      <View style={styles.grid}>
        <View style={styles.stat}>
          <Ionicons name="eye-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{analytics.views}</Text>
          <Text style={styles.label}>Views</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="people-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{analytics.rsvps}</Text>
          <Text style={styles.label}>RSVPs</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="ticket-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{analytics.ticketsSold}</Text>
          <Text style={styles.label}>Tickets Sold</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="cash-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>${analytics.revenue}</Text>
          <Text style={styles.label}>Revenue</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stat: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  label: {
    color: '#666',
  },
});