import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { RSVP } from '../../types/RSVP';
import { useProfile } from '../../hooks/useProfile';

interface RSVPItemProps {
  rsvp: RSVP;
}

function RSVPItem({ rsvp }: RSVPItemProps) {
  const { profile } = useProfile(rsvp.user_id);

  if (!profile) return null;

  return (
    <View style={styles.rsvpItem}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.userAffiliation}>{profile.community_affiliation}</Text>
      </View>
      <Text style={styles.rsvpTime}>
        {format(new Date(rsvp.rsvp_time), 'PPp')}
      </Text>
    </View>
  );
}

interface Props {
  rsvps: RSVP[];
}

export function RSVPList({ rsvps }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RSVPs ({rsvps.length})</Text>
      <FlatList
        data={rsvps}
        renderItem={({ item }) => <RSVPItem rsvp={item} />}
        keyExtractor={(item) => item.rsvp_id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No RSVPs yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  rsvpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userAffiliation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rsvpTime: {
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    paddingVertical: 20,
  },
});