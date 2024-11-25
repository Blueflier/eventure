import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Share, Alert } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ImageGallery } from '../../components/events/ImageGallery';
import { EventInfo } from '../../components/events/EventInfo';
import { RSVPButton } from '../../components/events/RSVPButton';
import { ActionButtons } from '../../components/events/ActionButtons';
import { OrganizerProfile } from '../../components/events/OrganizerProfile';
import { EventAnalytics } from '../../components/events/EventAnalytics';
import { RoleGuard } from '../../components/common/RoleGuard';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';
import { RSVP } from '../../types/RSVP';
import { api } from '../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type EventDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'EventDetailsScreen'>;
};

export default function EventDetailsScreen({ route }: EventDetailsScreenProps) {
  const navigation = useNavigation();
  const { session } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [rsvp, setRSVP] = useState<RSVP | null>(null);
  
  const { event_id } = route.params;
  const isOrganizer = event?.organizer_id === session?.user?.id;

  useEffect(() => {
    fetchEventDetails();
  }, [route.params?.event_id]);

  const fetchEventDetails = async () => {
    try {
      const response = await api.get<Event>(`/events/${event_id}`);
      if (response.ok && response.data) {
        setEvent(response.data);
      } else {
        Alert.alert('Error', response.error || 'Failed to fetch event details');
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      Alert.alert('Error', 'Failed to load event details');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${event?.title} on Eventure!`,
        url: `YOUR_APP_URL/events/${event?.event_id}`,
      });
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  const handleRSVPChange = (newRSVP: RSVP | null) => {
    setRSVP(newRSVP);
    if (newRSVP) {
      Alert.alert('Success', 'You have successfully RSVP\'d to this event!');
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await api.delete(`/events/${event?.event_id}`);
      if (response.ok) {
        Alert.alert('Success', 'Event successfully deleted');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  const handleFeatureEvent = async () => {
    try {
      const response = await api.put(`/events/${event?.event_id}/feature`);
      if (response.ok) {
        Alert.alert('Success', 'Event has been featured');
        fetchEventDetails(); // Refresh event details
      } else {
        Alert.alert('Error', response.error || 'Failed to feature event');
      }
    } catch (error) {
      console.error('Error featuring event:', error);
      Alert.alert('Error', 'Failed to feature event');
    }
  };

  if (!event) return null;

  return (
    <ScrollView style={styles.container}>
      <ImageGallery images={event.images || []} />
      <View style={styles.content}>
        <EventInfo event={event} />
        
        {!isOrganizer && (
          <RSVPButton
            eventId={event?.event_id}
            onRSVPChange={handleRSVPChange}
          />
        )}

        <ActionButtons
          event={event}
          onShare={handleShare}
          rsvp={rsvp}
        />
        
        <OrganizerProfile organizerId={event?.organizer_id} />
        
        <RoleGuard roles={['admin', 'moderator']}>
          <View style={styles.adminControls}>
            <Button
              title="Delete Event"
              onPress={handleDeleteEvent}
              variant="outline"
              style={styles.deleteButton}
            />
            <Button
              title="Feature Event"
              onPress={handleFeatureEvent}
              style={styles.featureButton}
            />
          </View>
        </RoleGuard>

        {isOrganizer && <EventAnalytics eventId={Number(event?.event_id)} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  adminControls: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  deleteButton: {
    marginBottom: 10,
    backgroundColor: '#ff4444',
  },
  featureButton: {
    backgroundColor: '#4CAF50',
  },
});