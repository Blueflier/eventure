import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { Attendance } from '../../types/Attendance';
import { useProfile } from '../../hooks/useProfile';

interface Props {
  attendance: Attendance;
}

export function AttendanceListItem({ attendance }: Props) {
  const { profile, loading } = useProfile(attendance.user_id);

  if (loading || !profile) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.affiliation}>{profile.community_affiliation}</Text>
      </View>
      <View style={styles.timeInfo}>
        <Text style={styles.checkInTime}>
          {format(new Date(attendance.scanned_at), 'h:mm a')}
        </Text>
        <Text style={styles.checkInDate}>
          {format(new Date(attendance.scanned_at), 'MMM d, yyyy')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  affiliation: {
    fontSize: 14,
    color: '#666',
  },
  timeInfo: {
    alignItems: 'flex-end',
  },
  checkInTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2e6ddf',
  },
  checkInDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});