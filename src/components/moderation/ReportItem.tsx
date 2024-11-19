import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Button } from '../common/Button';
import { useModeration } from '../../hooks/useModeration';
import { Report } from '../../types/Moderation';
import { ModerationActionModal } from './ModerationActionModal';

interface Props {
  report: Report;
  onActionTaken: () => void;
}

export function ReportItem({ report, onActionTaken }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const { loading } = useModeration();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.targetType}>
          {report.target_type.toUpperCase()}
        </Text>
        <Text style={styles.date}>
          {format(new Date(report.created_at), 'PPp')}
        </Text>
      </View>

      <Text style={styles.reason}>{report.reason}</Text>

      <View style={styles.actions}>
        <Button
          title="Take Action"
          onPress={() => setModalVisible(true)}
          loading={loading}
        />
      </View>

      <ModerationActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        report={report}
        onActionTaken={onActionTaken}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  reason: {
    fontSize: 16,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});