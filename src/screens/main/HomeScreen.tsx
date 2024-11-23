import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { Event } from '../../types';
import { FeaturedCarousel } from '../../components/home/FeaturedCarousel';
import { EventSection } from '../../components/home/EventSection';
import { QuickActions } from '../../components/home/QuickActions';
import { Camera } from 'expo-camera';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const requestCameraPermission = useCallback(async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access to use the QR scanner feature.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Failed to request camera permission');
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Implement your event fetching logic here
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('Error', 'Failed to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  }, [fetchEvents]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await requestCameraPermission();
      if (mounted) {
        await fetchEvents();
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [requestCameraPermission, fetchEvents]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            onPress={() => {
              if (!hasPermission) {
                requestCameraPermission();
              }
              // Handle scan action
            }}
            style={styles.headerButton}
          >
            <Ionicons name="qr-code-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {/* Handle notifications */}}
            style={styles.headerButton}
          >
            <Ionicons name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, hasPermission, requestCameraPermission]);

  return (
    <ErrorBoundary>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <QuickActions
          onScanPress={() => {
            if (!hasPermission) {
              requestCameraPermission();
            }
            // Handle scan action
          }}
          onNotificationsPress={() => {/* Handle notifications */}}
        />
        
        <FeaturedCarousel 
          events={events.filter(e => e.is_featured)}
          onEventPress={(event) => {/* Handle event press */}}
        />
        
        <EventSection
          title="Upcoming Events"
          events={events.filter(e => new Date(e.start_time) > new Date())}
          loading={loading}
        />
      </ScrollView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerButton: {
    marginLeft: 15,
  },
});