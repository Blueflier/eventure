import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput } from 'react-native';
import { Button } from '../common/Button';
import { StarRating } from './StarRating';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  loading: boolean;
}

export function RatingModal({ visible, onClose, onSubmit, loading }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    await onSubmit(rating, comment);
    setRating(0);
    setComment('');
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
          <Text style={styles.title}>Rate Organizer</Text>
          
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size={32}
            style={styles.starRating}
          />

          <TextInput
            style={styles.input}
            placeholder="Write a comment (optional)"
            value={comment}
            onChangeText={setComment}
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
              title="Submit"
              onPress={handleSubmit}
              loading={loading}
              disabled={rating === 0}
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
  starRating: {
    marginBottom: 20,
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