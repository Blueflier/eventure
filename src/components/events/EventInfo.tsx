import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Event } from '../../types';
import { EventMap } from './EventMap';
import { RecurrenceInfo } from './RecurrenceInfo';

interface Props {
  event: Event;
}

export function EventInfo({ event }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      
      <View style={styles.tagContainer}>
        {event.tags?.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color="#666" />
        <Text style={styles.infoText}>
          {format(new Date(event.start_time), 'PPP')} -{' '}
          {format(new Date(event.end_time), 'p')}
        </Text>
      </View>

      {event.recurrence && <RecurrenceInfo recurrence={event.recurrence} />}

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <Text style={styles.infoText}>{event.location_text}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="cash-outline" size={20} color="#666" />
        <Text style={styles.infoText}>
          {event.price ? `$${event.price.toFixed(2)}` : 'Free'}
        </Text>
      </View>

      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.mapContainer}>
        <EventMap
          location={{
            latitude: event.latitude,
            longitude: event.longitude,
            name: event.location_text,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 15,
  },
  mapContainer: {
    height: 200,
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
});