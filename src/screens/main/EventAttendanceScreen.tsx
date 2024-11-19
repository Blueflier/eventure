import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAttendance } from '../../hooks/useAttendance';
import { AttendanceStats } from '../../components/events/AttendanceStats';
import { AttendanceListItem } from '../../components/events/AttendanceListItem';
import { Attendance } from '../../types/Attendance';

export default function EventAttendanceScreen() {
  const route = useRoute();
  const eventId = route.params?.eventId;
  const { stats, loading, getAttendanceList, fetchAttendanceStats } = useAttendance(eventId);
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const list = await getAttendanceList();
    setAttendanceList(list);
    await fetchAttendanceStats();
  };

  return (
    <View style={styles.container}>
      <AttendanceStats stats={stats} loading={loading} />
      <FlatList
        data={attendanceList}
        renderItem={({ item }) => <AttendanceListItem attendance={item} />}
        keyExtractor={(item) => `${item.user_id}-${item.event_id}`}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
});