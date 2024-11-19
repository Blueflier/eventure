import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { SupportTicket } from '../../types/SupportTicket';

interface Props {
  ticket: SupportTicket;
}

export function SupportTicketItem({ ticket }: Props) {
  const navigation = useNavigation();

  const getStatusColor = () => {
    switch (ticket.status) {
      case 'open':
        return '#2e6ddf';
      case 'in_progress':
        return '#ff9800';
      case 'closed':
        return '#4caf50';
      default:
        return '#666';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('TicketDetails', { ticketId: ticket.ticket_id })}
    >
      <View style={styles.header}>
        <Text style={styles.subject}>{ticket.subject}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{ticket.status}</Text>
        </View>
      </View>

      <Text style={styles.message} numberOfLines={2}>
        {ticket.message}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.date}>
          Created: {format(new Date(ticket.created_at), 'PPp')}
        </Text>
        {ticket.updated_at !== ticket.created_at && (
          <Text style={styles.date}>
            Updated: {format(new Date(ticket.updated_at), 'PPp')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});