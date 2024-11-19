import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Attendance, AttendanceStats } from '../types/Attendance';

export function useAttendance(eventId: string) {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<AttendanceStats>({
    total: 0,
    scanned: 0,
    percentage: 0,
  });

  const markAttendance = async (userId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/attendance`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      if (!response.ok) throw new Error('Failed to mark attendance');
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
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/attendance/stats`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch attendance stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
    }
  };

  const getAttendanceList = async (): Promise<Attendance[]> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/${eventId}/attendance`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch attendance list');
      const data = await response.json();
      return data;
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