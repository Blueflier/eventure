import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';
import { Button } from '../common/Button';
import { useModeration } from '../../hooks/useModeration';
import { TargetType } from '../../types/Moderation';

interface Props {
  visible: boolean;
  onClose: () => void;
  targetId: string;
  targetType: TargetType;
  onSuccess?: () => void;
}

export function ReportContentModal({
  visible,
  onClose,
  targetId,
  targetType,
  onSuccess,
}: Props) {
  const [reason, setReason] = useState('');
  const { reportContent, loading } = useModeration();

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    const success = await reportContent(targetId, targetType, reason.trim());
    if (success) {
      onSuccess?.();
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
          <Text style={styles.title}>Report Content</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Why are you reporting this content?"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              style={styles.button}
            />
            <Button
              title="Submit Report"
              onPress={handleSubmit}
              loading={loading}
              disabled={!reason.trim()}
              style={styles.button}
            />
          </View>
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
  },
  button: {
    flex: 1,
  },
});