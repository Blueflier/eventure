import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';
import { Button } from '../common/Button';
import { useModeration } from '../../hooks/useModeration';
import { Report, ModerationActionType } from '../../types/Moderation';

interface Props {
  visible: boolean;
  onClose: () => void;
  report: Report;
  onActionTaken: () => void;
}

export function ModerationActionModal({
  visible,
  onClose,
  report,
  onActionTaken,
}: Props) {
  const [reason, setReason] = useState('');
  const { performModeration, loading } = useModeration();

  const handleAction = async (actionType: ModerationActionType) => {
    if (!reason.trim()) return;

    const success = await performModeration(
      actionType,
      report.target_id,
      report.target_type,
      reason.trim()
    );

    if (success) {
      onActionTaken();
      onClose();
      setReason('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Take Action</Text>

          <TextInput
            style={styles.input}
            placeholder="Reason for action"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Dismiss"
              onPress={() => handleAction('restore_content')}
              variant="outline"
              style={styles.button}
              loading={loading}
            />
            <Button
              title="Remove Content"
              onPress={() => handleAction('remove_content')}
              style={[styles.button, styles.removeButton]}
              loading={loading}
            />
          </View>

          <Button
            title="Cancel"
            onPress={onClose}
            variant="outline"
            style={styles.cancelButton}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  button: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#f44336',
  },
  cancelButton: {
    marginTop: 8,
  },
});