import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { EventListItem } from './EventListItem';
import { Event } from '../../types';
import { api } from '../../utils/api';

export function AttendingEvents() {
  const { session } = useAuth();
  const [sections, setSections] = useState([
    { title: 'Upcoming Events', data: [] },
    { title: 'Past Events', data: [] },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendingEvents();
  }, []);

  const fetchAttendingEvents = async () => {
    try {
      const response = await api.get<Event[]>(`/api/users/${session?.user.id}/attending-events`);
      
      if (!response.ok || !response.data) {
        throw new Error(response.error || 'Failed to fetch events');
      }

      const now = new Date();
      const upcoming = response.data.filter(
        (event: Event) => new Date(event.start_time) > now
      );
      const past = response.data.filter(
        (event: Event) => new Date(event.start_time) <= now
      );

      setSections([
        { title: 'Upcoming Events', data: upcoming },
        { title: 'Past Events', data: past },
      ]);
    } catch (error) {
      console.error('Error fetching attending events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.event_id.toString()}
      renderItem={({ item }) => <EventListItem event={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});