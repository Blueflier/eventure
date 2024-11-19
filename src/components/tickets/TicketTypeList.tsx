import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TicketTypeCard } from './TicketTypeCard';
import { TicketWithPricing } from '../../types/Ticket';

interface Props {
  tickets: TicketWithPricing[];
  onUpdate: () => void;
  isOrganizer?: boolean;
}

export function TicketTypeList({ tickets, onUpdate, isOrganizer }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Types</Text>
      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <TicketTypeCard
            ticket={item}
            onUpdate={onUpdate}
            isOrganizer={isOrganizer}
          />
        )}
        keyExtractor={(item) => item.ticket_type_id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No ticket types available</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  list: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    paddingVertical: 20,
  },
});