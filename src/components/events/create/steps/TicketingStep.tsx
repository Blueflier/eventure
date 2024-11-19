import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TicketTypeForm } from '../TicketTypeForm';
import { Button } from '../../../common/Button';
import { Event, TicketType } from '../../../../types';

interface Props {
  eventData: Partial<Event>;
  setEventData: (data: Partial<Event>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TicketingStep({
  eventData,
  setEventData,
  onNext,
  onBack,
}: Props) {
  const handleAddTicketType = (ticketType: TicketType) => {
    setEventData({
      ...eventData,
      ticketTypes: [...(eventData.ticketTypes || []), ticketType],
    });
  };

  const handleRemoveTicketType = (index: number) => {
    setEventData({
      ...eventData,
      ticketTypes: eventData.ticketTypes?.filter((_, i) => i !== index),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TicketTypeForm onSubmit={handleAddTicketType} />

      {eventData.ticketTypes?.map((ticket, index) => (
        <View key={index} style={styles.ticketItem}>
          <TicketTypeForm
            initialData={ticket}
            onSubmit={(updated) => {
              const updatedTypes = [...(eventData.ticketTypes || [])];
              updatedTypes[index] = updated;
              setEventData({ ...eventData, ticketTypes: updatedTypes });
            }}
            onDelete={() => handleRemoveTicketType(index)}
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="outline" />
        <Button
          title="Next"
          onPress={onNext}
          disabled={!eventData.ticketTypes?.length}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ticketItem: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});