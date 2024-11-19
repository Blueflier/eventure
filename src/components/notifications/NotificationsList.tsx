import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../../types';

interface Props {
  notifications: Notification[];
  loading?: boolean;
}

export function NotificationsList({ notifications, loading }: Props) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e6ddf" />
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NotificationItem notification={item} />}
      contentContainerStyle={styles.list}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notifications</Text>
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
    flexGrow: 1,
    padding: 16,
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