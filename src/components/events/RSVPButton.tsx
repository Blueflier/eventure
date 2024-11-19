import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { useRSVP } from '../../hooks/useRSVP';
import { RSVP } from '../../types/RSVP';

interface Props {
  eventId: string;
  onRSVPChange?: (rsvp: RSVP | null) => void;
}

export function RSVPButton({ eventId, onRSVPChange }: Props) {
  const { loading, checkRSVPStatus, handleRSVP, cancelRSVP } = useRSVP();
  const [hasRSVP, setHasRSVP] = useState(false);

  useEffect(() => {
    checkInitialStatus();
  }, [eventId]);

  const checkInitialStatus = async () => {
    const status = await checkRSVPStatus(eventId);
    setHasRSVP(!!status);
    onRSVPChange?.(status);
  };

  const toggleRSVP = async () => {
    const response = hasRSVP
      ? await cancelRSVP(eventId)
      : await handleRSVP(eventId);

    if (response.success) {
      setHasRSVP(!hasRSVP);
      onRSVPChange?.(response.rsvp || null);
    }
  };

  return (
    <Button
      title={hasRSVP ? 'Cancel RSVP' : 'RSVP'}
      onPress={toggleRSVP}
      loading={loading}
      variant={hasRSVP ? 'outline' : 'solid'}
      style={[styles.button, hasRSVP && styles.cancelButton]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  cancelButton: {
    borderColor: '#ff4444',
  },
});