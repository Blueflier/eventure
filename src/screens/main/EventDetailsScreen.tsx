import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Share, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
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

export default function EventDetailsScreen() {
  const route = useRoute();
  const { session } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [rsvp, setRSVP] = useState<RSVP | null>(null);
  const isOrganizer = event?.createdBy === session?.user?.id;

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${route.params?.eventId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${event?.title} on Eventure!`,
        url: `YOUR_APP_URL/events/${event?.id}`,
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

  if (!event) return null;

  return (
    <ScrollView style={styles.container}>
      <ImageGallery images={event.images || []} />
      <View style={styles.content}>
        <EventInfo event={event} />
        
        {!isOrganizer && (
          <RSVPButton
            eventId={event.id}
            onRSVPChange={handleRSVPChange}
          />
        )}

        <ActionButtons
          event={event}
          onShare={handleShare}
          rsvp={rsvp}
        />
        
        <OrganizerProfile organizerId={event.createdBy} />
        
        <RoleGuard roles={['admin', 'moderator']}>
          <View style={styles.adminControls}>
            <Button
              title="Delete Event"
              onPress={() => {/* Handle delete */}}
              variant="outline"
              style={styles.deleteButton}
            />
            <Button
              title="Feature Event"
              onPress={() => {/* Handle feature */}}
              style={styles.featureButton}
            />
          </View>
        </RoleGuard>

        {isOrganizer && <EventAnalytics eventId={event.id} />}
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