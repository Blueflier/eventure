import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { Engagement } from '../../types/Engagement';
import { useProfile } from '../../hooks/useProfile';

interface Props {
  engagement: Engagement;
}

function EngagementItem({ engagement }: Props) {
  const { profile } = useProfile(engagement.user_id);

  if (!profile) return null;

  return (
    <View style={styles.item}>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.type}>{engagement.type}</Text>
      </View>
      <Text style={styles.time}>
        {format(new Date(engagement.created_at), 'PPp')}
      </Text>
    </View>
  );
}

interface ListProps {
  engagements: Engagement[];
  loading?: boolean;
}

export function EngagementHistory({ engagements, loading }: ListProps) {
  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <FlatList
        data={engagements}
        renderItem={({ item }) => <EngagementItem engagement={item} />}
        keyExtractor={(item) => item.engagement_id}
        contentContainerStyle={styles.list}
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
  item: {
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
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});