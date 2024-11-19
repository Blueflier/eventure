import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlockUserButton } from './BlockUserButton';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { ReportContentModal } from '../moderation/ReportContentModal';

interface Props {
  userId: string;
  onMessagePress?: () => void;
}

export function UserProfileActions({ userId, onMessagePress }: Props) {
  const { session } = useAuth();
  const [reportModalVisible, setReportModalVisible] = React.useState(false);

  if (session?.user?.id === userId) return null;

  return (
    <View style={styles.container}>
      <Button
        title="Message"
        onPress={onMessagePress}
        style={styles.button}
      />
      <BlockUserButton userId={userId} />
      <Button
        title="Report User"
        onPress={() => setReportModalVisible(true)}
        variant="outline"
        style={styles.reportButton}
      />

      <ReportContentModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        targetId={userId}
        targetType="user"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  button: {
    marginBottom: 8,
  },
  reportButton: {
    borderColor: '#ff4444',
  },
});