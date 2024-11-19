import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Notification } from '../../types/Notification';
import { useNavigation } from '@react-navigation/native';

interface Props {
  notification: Notification;
  onPress: () => void;
  onDelete: () => void;
}

export function NotificationItem({ notification, onPress, onDelete }: Props) {
  const navigation = useNavigation();

  const getIconName = () => {
    switch (notification.type) {
      case 'message':
        return 'mail-outline';
      case 'event_update':
        return 'calendar-outline';
      case 'rsvp_confirmation':
        return 'checkmark-circle-outline';
      case 'event_reminder':
        return 'alarm-outline';
      case 'event_cancelled':
        return 'close-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  const handlePress = () => {
    onPress();
    if (notification.related_type === 'event') {
      navigation.navigate('EventDetails', { eventId: notification.related_id });
    } else if (notification.related_type === 'message') {
      navigation.navigate('Messages', { messageId: notification.related_id });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.read_status && styles.unread,
        notification.priority === 'high' && styles.highPriority,
      ]}
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName()}
          size={24}
          color={notification.priority === 'high' ? '#ff4444' : '#2e6ddf'}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{notification.content}</Text>
        <Text style={styles.time}>
          {format(new Date(notification.created_at), 'PPp')}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  unread: {
    backgroundColor: '#f0f7ff',
  },
  highPriority: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    padding: 4,
  },
});