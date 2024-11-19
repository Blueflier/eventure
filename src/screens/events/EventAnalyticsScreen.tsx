import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEventAnalytics } from '../../hooks/useEventAnalytics';
import { AnalyticsOverview } from '../../components/events/analytics/AnalyticsOverview';
import { AnalyticsTrends } from '../../components/events/analytics/AnalyticsTrends';
import { AnalyticsOverview as AnalyticsData } from '../../types/EventAnalytics';

export default function EventAnalyticsScreen() {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const { getAnalytics, loading } = useEventAnalytics(eventId);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const data = await getAnalytics();
    if (data) {
      setAnalytics(data);
    }
  };

  if (loading || !analytics) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e6ddf" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <AnalyticsOverview
        analytics={analytics.current}
        conversionRate={analytics.conversionRate}
        attendanceRate={analytics.attendanceRate}
      />
      <AnalyticsTrends trends={analytics.trends} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});