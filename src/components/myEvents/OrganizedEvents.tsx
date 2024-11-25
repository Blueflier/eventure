import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { EventListItem } from './EventListItem';
import { Event } from '../../types';
import { api } from '../../utils/api';

export function OrganizedEvents() {
  const { session } = useAuth();
  const [sections, setSections] = useState([
    { title: 'Published Events', data: [] },
    { title: 'Scheduled Events', data: [] },
    { title: 'Draft Events', data: [] },
    { title: 'Cancelled Events', data: [] },
    { title: 'Past Events', data: [] },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizedEvents();
  }, []);

  const fetchOrganizedEvents = async () => {
    try {
      const response = await api.get<Event[]>(
        `/api/users/${session?.user.id}/organized-events`
      );
      
      if (!response.ok || !response.data) {
        throw new Error(response.error || 'Failed to fetch events');
      }

      const now = new Date();
      const published = response.data.filter(
        (event: Event) => 
          event.event_status === 'published' && new Date(event.start_time) > now
      );
      const scheduled = response.data.filter(
        (event: Event) => 
          event.event_status === 'scheduled' && new Date(event.start_time) > now
      );
      const drafts = response.data.filter(
        (event: Event) => event.event_status === 'draft'
      );
      const cancelled = response.data.filter(
        (event: Event) => event.event_status === 'cancelled'
      );
      const past = response.data.filter(
        (event: Event) => 
          (event.event_status === 'published' || event.event_status === 'completed') && 
          new Date(event.start_time) <= now
      );

      setSections([
        { title: 'Published Events', data: published },
        { title: 'Scheduled Events', data: scheduled },
        { title: 'Draft Events', data: drafts },
        { title: 'Cancelled Events', data: cancelled },
        { title: 'Past Events', data: past },
      ]);
    } catch (error) {
      console.error('Error fetching organized events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <EventListItem event={item} isOrganizer={true} />
      )}
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