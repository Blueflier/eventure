import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AttendanceStats as Stats } from '../../types/Attendance';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  stats: Stats;
  loading: boolean;
}

export function AttendanceStats({ stats, loading }: Props) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={36} color="#2e6ddf" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={24} color="#2e6ddf" />
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total RSVPs</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>{stats.scanned}</Text>
          <Text style={styles.statLabel}>Checked In</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Ionicons name="analytics-outline" size={24} color="#FF9800" />
          <Text style={styles.statValue}>{stats.percentage}%</Text>
          <Text style={styles.statLabel}>Attendance Rate</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  statCard: {
    flexDirection: 'row',
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
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});