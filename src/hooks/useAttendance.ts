import { useState } from 'react';
import { api } from '../utils/api';
import { Attendance, AttendanceStats } from '../types/Attendance';

export function useAttendance(eventId: string) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<AttendanceStats>({
    total: 0,
    scanned: 0,
    percentage: 0,
  });

  const markAttendance = async (userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.post(`/events/${eventId}/attendance`, { user_id: userId });
      
      if (!response.ok) throw new Error(response.error || 'Failed to mark attendance');
      await fetchAttendanceStats();
      return true;
    } catch (error) {
      console.error('Error marking attendance:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceStats = async () => {
    try {
      const response = await api.get<AttendanceStats>(`/events/${eventId}/attendance/stats`);
      
      if (!response.ok) throw new Error(response.error || 'Failed to fetch attendance stats');
      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
    }
  };

  const getAttendanceList = async (): Promise<Attendance[]> => {
    try {
      const response = await api.get<Attendance[]>(`/events/${eventId}/attendance`);
      
      if (!response.ok) throw new Error(response.error || 'Failed to fetch attendance list');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching attendance list:', error);
      return [];
    }
  };

  return {
    loading,
    stats,
    markAttendance,
    fetchAttendanceStats,
    getAttendanceList,
  };
}