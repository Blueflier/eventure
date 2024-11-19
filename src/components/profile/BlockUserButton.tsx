import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { useBlockedUsers } from '../../hooks/useBlockedUsers';
import { Alert } from 'react-native';

interface Props {
  userId: string;
  onBlockStatusChange?: (isBlocked: boolean) => void;
}

export function BlockUserButton({ userId, onBlockStatusChange }: Props) {
  const [isBlocked, setIsBlocked] = useState(false);
  const { loading, blockUser, unblockUser, isUserBlocked } = useBlockedUsers();

  useEffect(() => {
    checkBlockStatus();
  }, [userId]);

  const checkBlockStatus = async () => {
    const blocked = await isUserBlocked(userId);
    setIsBlocked(blocked);
  };

  const handleToggleBlock = async () => {
    const action = isBlocked ? unblockUser : blockUser;
    const actionName = isBlocked ? 'unblock' : 'block';

    Alert.alert(
      `Confirm ${actionName}`,
      `Are you sure you want to ${actionName} this user?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            const response = await action(userId);
            if (response.success) {
              setIsBlocked(!isBlocked);
              onBlockStatusChange?.(!isBlocked);
              Alert.alert('Success', response.message);
            } else {
              Alert.alert('Error', response.message);
            }
          },
        },
      ]
    );
  };

  return (
    <Button
      title={isBlocked ? 'Unblock User' : 'Block User'}
      onPress={handleToggleBlock}
      loading={loading}
      variant={isBlocked ? 'outline' : 'solid'}
      style={[styles.button, isBlocked && styles.unblockButton]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  unblockButton: {
    borderColor: '#ff4444',
  },
});