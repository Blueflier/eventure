import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useSupportTickets } from '../../hooks/useSupportTickets';
import { SupportTicket } from '../../types/SupportTicket';

export default function TicketDetailsScreen() {
  const route = useRoute();
  const ticketId = route.params?.ticketId;
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const { getTicketDetails, loading } = useSupportTickets();

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    const details = await getTicketDetails(ticketId);
    setTicket(details);
  };

  if (loading || !ticket) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={36} color="#2e6ddf" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subject}>{ticket.subject}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: ticket.status === 'closed' ? '#4caf50' : '#2e6ddf' },
          ]}
        >
          <Text style={styles.statusText}>{ticket.status}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Message</Text>
        <Text style={styles.message}>{ticket.message}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Created</Text>
        <Text style={styles.date}>
          {format(new Date(ticket.created_at), 'PPp')}
        </Text>
      </View>

      {ticket.updated_at !== ticket.created_at && (
        <View style={styles.section}>
          <Text style={styles.label}>Last Updated</Text>
          <Text style={styles.date}>
            {format(new Date(ticket.updated_at), 'PPp')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
  },
  date: {
    fontSize: 16,
    color: '#333',
  },
});