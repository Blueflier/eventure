import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

export function SupportTicket() {
  const { session } = useAuth();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('YOUR_GO_BACKEND_URL/api/support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          subject,
          description,
          userId: session?.user.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit ticket');

      Alert.alert(
        'Success',
        'Your support ticket has been submitted. We\'ll get back to you soon!'
      );
      setSubject('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit support ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit a Support Ticket</Text>
      <Text style={styles.description}>
        Need help? Submit a ticket and our support team will assist you.
      </Text>

      <Input
        label="Subject"
        value={subject}
        onChangeText={setSubject}
        placeholder="Brief description of your issue"
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Provide details about your issue"
        multiline
        numberOfLines={6}
        style={styles.descriptionInput}
      />

      <Button
        title="Submit Ticket"
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
  },
});