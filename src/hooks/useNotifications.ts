import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Notification, NotificationType } from '../types/Notification';

const BATCH_SIZE = 50;

export function useNotifications() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setNotifications(data || []);
      updateUnreadCount(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const updateUnreadCount = useCallback((notifs: Notification[]) => {
    const count = notifs.filter(n => !n.read_status).length;
    setUnreadCount(count);
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_status: true })
        .eq('notification_id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(n =>
          n.notification_id === notificationId
            ? { ...n, read_status: true }
            : n
        )
      );
      updateUnreadCount([...notifications]);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Alert.alert('Error', 'Failed to update notification');
    }
  }, [notifications, updateUnreadCount]);

  const markAllAsRead = useCallback(async () => {
    try {
      setLoading(true);
      const unreadNotifications = notifications.filter(n => !n.read_status);
      
      // Process in batches
      for (let i = 0; i < unreadNotifications.length; i += BATCH_SIZE) {
        const batch = unreadNotifications.slice(i, i + BATCH_SIZE);
        const { error } = await supabase
          .from('notifications')
          .update({ read_status: true })
          .in('notification_id', batch.map(n => n.notification_id));

        if (error) throw error;
      }

      setNotifications(prev =>
        prev.map(n => ({ ...n, read_status: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      Alert.alert('Error', 'Failed to update notifications');
    } finally {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
  };
}