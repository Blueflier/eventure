import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { SettingsSection } from './SettingsSection';
import { api } from '../../utils/api';

interface Props {
  userId?: string;
}

interface AuditLog {
  id: string;
  action: string;
  details: string;
  created_at: string;
}

export function AuditLogs({ userId }: Props) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchAuditLogs();
    }
  }, [userId]);

  const fetchAuditLogs = async () => {
    try {
      const response = await api.get(
        `/api/audit-logs/${userId}?limit=50&sort=created_at:desc`
      );

      if (response.ok) {
        setLogs(response.data as AuditLog[]);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderLogItem = ({ item }: { item: AuditLog }) => (
    <View style={styles.logItem}>
      <Text style={styles.action}>{item.action}</Text>
      <Text style={styles.details}>{item.details}</Text>
      <Text style={styles.timestamp}>
        {format(new Date(item.created_at), 'PPp')}
      </Text>
    </View>
  );

  return (
    <SettingsSection title="Audit Logs">
      <FlatList
        data={logs}
        renderItem={renderLogItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No audit logs available</Text>
        }
      />
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
  logItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  action: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
});