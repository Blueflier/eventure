import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { Event } from '../../types';
import { RSVP } from '../../types/RSVP';

interface Props {
  event: Event;
  onShare: () => void;
  rsvp: RSVP | null;
}

export function ActionButtons({ event, onShare, rsvp }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Share"
          onPress={onShare}
          variant="outline"
          style={styles.shareButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  shareButton: {
    flex: 1,
  },
});