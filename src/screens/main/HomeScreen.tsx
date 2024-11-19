import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Event } from '../../types';
import { FeaturedCarousel } from '../../components/home/FeaturedCarousel';
import { EventSection } from '../../components/home/EventSection';
import { QuickActions } from '../../components/home/QuickActions';
import * as BarCodeScanner from 'expo-barcode-scanner';

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('YOUR_GO_BACKEND_URL/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventPress = (event: Event) => {
    // Navigate to event details
    console.log('Event pressed:', event);
  };

  const handleScanPress = () => {
    if (hasPermission === null) {
      Alert.alert('Requesting camera permission');
    } else if (hasPermission === false) {
      Alert.alert('No access to camera');
    } else {
      // Navigate to QR scanner screen
      console.log('Open QR scanner');
    }
  };

  const handleNotificationsPress = () => {
    // Navigate to notifications screen
    console.log('Open notifications');
  };

  const getFeaturedEvents = () => events.filter(event => event.featured);
  const getFreeFood = () => events.filter(event => event.tags?.includes('Free Food'));
  const getClubEvents = () => events.filter(event => event.tags?.includes('Club'));
  const getTodayEvents = () => events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date.startsWith(today);
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FeaturedCarousel
          events={getFeaturedEvents()}
          onEventPress={handleEventPress}
        />
        <EventSection
          title="Free Food Events"
          events={getFreeFood()}
          onEventPress={handleEventPress}
        />
        <EventSection
          title="Club Events"
          events={getClubEvents()}
          onEventPress={handleEventPress}
        />
        <EventSection
          title="Happening Today"
          events={getTodayEvents()}
          onEventPress={handleEventPress}
        />
      </ScrollView>
      <QuickActions
        onScanPress={handleScanPress}
        onNotificationsPress={handleNotificationsPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});