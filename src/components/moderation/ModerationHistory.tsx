import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { useModeration } from '../../hooks/useModeration';
import { ModerationLog } from '../../types/Moderation';

export function ModerationHistory() {
  const [history, setHistory] = useState<ModerationLog[]>([]);
  const { getModerationHistory } = useModeration();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const data = await getModerationHistory();
    setHistory(data);
  };

  const renderItem = ({ item }: { item: ModerationLog }) => (
    <View style={styles.historyItem}>
      <View style={styles.actionHeader}>
        <Text style={styles.actionType}>
          {item.action_type.replace('_', ' ').toUpperCase()}
        </Text>
        <Text style={styles.date}>
          {format(new Date(item.created_at), 'PPp')}
        </Text>
      </View>
      <Text style={styles.reason}>{item.reason}</Text>
      <Text style={styles.target}>
        {item.target_type}: {item.target_id}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Actions</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.moderation_id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No moderation history</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  reason: {
    fontSize: 16,
    marginBottom: 8,
  },
  target: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});