import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { NotificationItem } from './NotificationItem';
import { Button } from '../common/Button';
import { Notification } from '../../types/Notification';

interface Props {
  notifications: Notification[];
  loading: boolean;
  onRefresh: () => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationList({
  notifications,
  loading,
  onRefresh,
  onMarkAsRead,
  onDelete,
  onMarkAllAsRead,
}: Props) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e6ddf" />
      </View>
    );
  }

  const hasUnread = notifications.some((n) => !n.read_status);

  return (
    <View style={styles.container}>
      {hasUnread && (
        <Button
          title="Mark All as Read"
          onPress={onMarkAllAsRead}
          variant="outline"
          style={styles.markAllButton}
        />
      )}
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => onMarkAsRead(item.notification_id)}
            onDelete={() => onDelete(item.notification_id)}
          />
        )}
        keyExtractor={(item) => item.notification_id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  markAllButton: {
    margin: 16,
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