import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useSupportTickets } from '../../hooks/useSupportTickets';
import { SupportTicketItem } from './SupportTicketItem';
import { SupportTicket } from '../../types/SupportTicket';

export function SupportTicketList() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const { getUserTickets, loading } = useSupportTickets();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const userTickets = await getUserTickets();
    setTickets(userTickets);
  };

  if (loading && !tickets.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={36} color="#2e6ddf" />
      </View>
    );
  }

  return (
    <FlatList
      data={tickets}
      renderItem={({ item }) => <SupportTicketItem ticket={item} />}
      keyExtractor={(item) => item.ticket_id}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchTickets} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No support tickets</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});