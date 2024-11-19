import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventAnalytics } from '../../../types/EventAnalytics';

interface Props {
  analytics: EventAnalytics;
  conversionRate: number;
  attendanceRate: number;
}

export function AnalyticsOverview({ analytics, conversionRate, attendanceRate }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Performance</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Ionicons name="eye-outline" size={24} color="#2e6ddf" />
          <Text style={styles.statValue}>{analytics.views_count}</Text>
          <Text style={styles.statLabel}>Views</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={24} color="#4caf50" />
          <Text style={styles.statValue}>{analytics.rsvp_count}</Text>
          <Text style={styles.statLabel}>RSVPs</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#ff9800" />
          <Text style={styles.statValue}>{analytics.attendance_count}</Text>
          <Text style={styles.statLabel}>Attendees</Text>
        </View>
      </View>

      <View style={styles.ratesContainer}>
        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>RSVP Rate</Text>
          <Text style={styles.rateValue}>{(conversionRate * 100).toFixed(1)}%</Text>
        </View>

        <View style={styles.rateItem}>
          <Text style={styles.rateLabel}>Attendance Rate</Text>
          <Text style={styles.rateValue}>{(attendanceRate * 100).toFixed(1)}%</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Engagement Score</Text>
        <Text style={[styles.scoreValue, { color: getScoreColor(analytics.engagement_score) }]}>
          {analytics.engagement_score.toFixed(1)}
        </Text>
      </View>
    </View>
  );
}

const getScoreColor = (score: number) => {
  if (score >= 8) return '#4caf50';
  if (score >= 6) return '#ff9800';
  return '#f44336';
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  ratesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    marginBottom: 16,
  },
  rateItem: {
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  scoreContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});