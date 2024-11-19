import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ModerationStats as Stats } from '../../types/Moderation';

interface Props {
  stats: Stats | null;
  onRefresh: () => void;
}

export function ModerationStats({ stats, onRefresh }: Props) {
  if (!stats) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Moderation Overview</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color="#2e6ddf" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Ionicons name="warning" size={24} color="#ff9800" />
          <Text style={styles.statValue}>{stats.pendingReports}</Text>
          <Text style={styles.statLabel}>Pending Reports</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="flag" size={24} color="#f44336" />
          <Text style={styles.statValue}>{stats.totalReports}</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="shield-checkmark" size={24} color="#4caf50" />
          <Text style={styles.statValue}>{stats.actionsToday}</Text>
          <Text style={styles.statLabel}>Actions Today</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
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
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});