import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ModerationStats } from '../../components/moderation/ModerationStats';
import { PendingReportsList } from '../../components/moderation/PendingReportsList';
import { ModerationHistory } from '../../components/moderation/ModerationHistory';
import { useModeration } from '../../hooks/useModeration';
import { ModerationStats as Stats } from '../../types/Moderation';

export default function ModerationDashboardScreen() {
  const [stats, setStats] = useState<Stats | null>(null);
  const { getModerationStats } = useModeration();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const data = await getModerationStats();
    setStats(data);
  };

  return (
    <ScrollView style={styles.container}>
      <ModerationStats stats={stats} onRefresh={fetchStats} />
      <PendingReportsList onActionTaken={fetchStats} />
      <ModerationHistory />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});