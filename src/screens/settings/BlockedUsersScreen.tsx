import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { BlockedUserItem } from '../../components/settings/BlockedUserItem';
import { BlockedUser } from '../../types/BlockedUser';

export default function BlockedUsersScreen() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { getBlockedUsers } = useBlockedUsers();

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const fetchBlockedUsers = async () => {
    setRefreshing(true);
    const users = await getBlockedUsers();
    setBlockedUsers(users);
    setRefreshing(false);
  };

  const handleUnblock = (userId: string) => {
    setBlockedUsers((prev) =>
      prev.filter((user) => user.blocked_user_id !== userId)
    );
  };

  if (refreshing && !blockedUsers.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e6ddf" />
      </View>
    );
  }

  return (
    <FlatList
      data={blockedUsers}
      renderItem={({ item }) => (
        <BlockedUserItem
          blockedUser={item}
          onUnblock={() => handleUnblock(item.blocked_user_id)}
        />
      )}
      keyExtractor={(item) => item.blocked_user_id}
      contentContainerStyle={styles.list}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchBlockedUsers} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No blocked users</Text>
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