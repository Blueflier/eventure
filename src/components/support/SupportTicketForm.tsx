import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useSupportTickets } from '../../hooks/useSupportTickets';

export function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { createTicket, loading } = useSupportTickets();

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const ticket = await createTicket({
      subject: subject.trim(),
      message: message.trim(),
    });

    if (ticket) {
      Alert.alert('Success', 'Your support ticket has been submitted');
      setSubject('');
      setMessage('');
    } else {
      Alert.alert('Error', 'Failed to submit support ticket');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Subject"
        value={subject}
        onChangeText={setSubject}
        placeholder="Brief description of your issue"
        style={styles.input}
      />

      <Input
        label="Message"
        value={message}
        onChangeText={setMessage}
        placeholder="Provide details about your issue"
        multiline
        numberOfLines={6}
        style={styles.messageInput}
      />

      <Button
        title="Submit Ticket"
        onPress={handleSubmit}
        loading={loading}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  messageInput: {
    height: 120,
    marginBottom: 24,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 8,
  },
});