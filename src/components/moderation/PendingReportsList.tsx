import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useModeration } from '../../hooks/useModeration';
import { Report } from '../../types/Moderation';
import { ReportItem } from './ReportItem';

interface Props {
  onActionTaken: () => void;
}

export function PendingReportsList({ onActionTaken }: Props) {
  const [reports, setReports] = useState<Report[]>([]);
  const { getPendingReports, loading } = useModeration();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const data = await getPendingReports();
    setReports(data);
  };

  const handleActionTaken = () => {
    fetchReports();
    onActionTaken();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Reports</Text>
      <FlatList
        data={reports}
        renderItem={({ item }) => (
          <ReportItem report={item} onActionTaken={handleActionTaken} />
        )}
        keyExtractor={(item) => item.report_id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchReports} />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No pending reports</Text>
        }
        contentContainerStyle={styles.list}
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
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});