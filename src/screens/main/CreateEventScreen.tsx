import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateEventWizard } from '../../components/events/create/CreateEventWizard';
import { EventPreview } from '../../components/events/create/EventPreview';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';

export default function CreateEventScreen() {
  const navigation = useNavigation();
  const { session } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState<Partial<Event>>({
    title: '',
    description: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    location: undefined,
    price: 0,
    images: [],
    tags: [],
    createdBy: session?.user?.id,
  });

  const handleSave = async (isDraft: boolean = true) => {
    try {
      const response = await fetch('YOUR_GO_BACKEND_URL/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          ...eventData,
          status: isDraft ? 'draft' : 'published',
        }),
      });

      if (!response.ok) throw new Error('Failed to save event');

      navigation.goBack();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <CreateEventWizard
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          eventData={eventData}
          setEventData={setEventData}
          onSave={handleSave}
        />
      </ScrollView>
      <EventPreview event={eventData as Event} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});