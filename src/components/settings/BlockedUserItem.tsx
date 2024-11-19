import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { BlockedUser } from '../../types/BlockedUser';
import { Button } from '../common/Button';
import { useProfile } from '../../hooks/useProfile';

interface Props {
  blockedUser: BlockedUser;
  onUnblock: () => void;
}

export function BlockedUserItem({ blockedUser, onUnblock }: Props) {
  const { profile } = useProfile(blockedUser.blocked_user_id);

  if (!profile) return null;

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.date}>
          Blocked on {format(new Date(blockedUser.blocked_at), 'PPp')}
        </Text>
      </View>
      <Button
        title="Unblock"
        onPress={onUnblock}
        variant="outline"
        style={styles.unblockButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  unblockButton: {
    marginLeft: 16,
  },
});