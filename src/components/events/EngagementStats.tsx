import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EngagementStats as Stats } from '../../types/Engagement';

interface Props {
  stats: Stats;
  loading?: boolean;
}

export function EngagementStats({ stats, loading }: Props) {
  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Ionicons name="eye-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{stats.views}</Text>
          <Text style={styles.label}>Views</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="people-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{stats.rsvps}</Text>
          <Text style={styles.label}>RSVPs</Text>
        </View>
      </View>
      <View style={styles.statRow}>
        <View style={styles.stat}>
          <Ionicons name="chatbubble-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{stats.comments}</Text>
          <Text style={styles.label}>Comments</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="share-outline" size={24} color="#2e6ddf" />
          <Text style={styles.number}>{stats.shares}</Text>
          <Text style={styles.label}>Shares</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
});