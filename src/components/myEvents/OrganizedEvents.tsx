import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { EventListItem } from './EventListItem';
import { Event } from '../../types';

export function OrganizedEvents() {
  const { session } = useAuth();
  const [sections, setSections] = useState([
    { title: 'Published Events', data: [] },
    { title: 'Draft Events', data: [] },
    { title: 'Past Events', data: [] },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizedEvents();
  }, []);

  const fetchOrganizedEvents = async () => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/users/${session?.user.id}/organized-events`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const events = await response.json();
      
      const now = new Date();
      const published = events.filter(
        (event: Event) => 
          event.status === 'published' && new Date(event.startDate) > now
      );
      const drafts = events.filter((event: Event) => event.status === 'draft');
      const past = events.filter(
        (event: Event) => 
          event.status === 'published' && new Date(event.startDate) <= now
      );

      setSections([
        { title: 'Published Events', data: published },
        { title: 'Draft Events', data: drafts },
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