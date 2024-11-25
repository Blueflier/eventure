import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native';
import { Event } from '../../types';
import { FeaturedCarousel } from '../../components/home/FeaturedCarousel';
import { EventSection } from '../../components/home/EventSection';
import { Camera } from 'expo-camera';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { api } from '../../utils/api';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
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
      const response = await api.get<Event[]>('/events');
      if (response.ok && response.data) {
        setEvents(response.data);
      } else {
        Alert.alert('Error', response.error || 'Failed to load events');
      }
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
                return;
              }
              navigation.navigate('EventQRScannerScreen');
            }}
            style={styles.headerButton}
          >
            <Ionicons name="qr-code-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('NotificationsScreen')}
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
        <FeaturedCarousel 
          events={events.filter(e => e.is_featured)}
          onEventPress={(event) => {/* Handle event press */}}
        />
        
        <EventSection
          title="Upcoming Events"
          events={events.filter(e => new Date(e.start_time) > new Date())}
          loading={loading}
          onEventPress={(event) => 
            navigation.navigate('EventDetailsScreen', { 
              event_id: event.event_id
            })
          }
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