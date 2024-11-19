import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Notification, NotificationType } from '../types/Notification';

export function useNotifications() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchNotifications();
      subscribeToNotifications();
    }
  }, [session]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
      updateUnreadCount(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNotifications = () => {
    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${session?.user.id}`,
        },
        (payload) => {
          handleNotificationChange(payload);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleNotificationChange = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setNotifications((prev) => [payload.new, ...prev]);
      setUnreadCount((prev) => prev + 1);
    } else if (payload.eventType === 'UPDATE') {
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === payload.new.notification_id ? payload.new : n
        )
      );
      updateUnreadCount([...notifications]);
    } else if (payload.eventType === 'DELETE') {
      setNotifications((prev) =>
        prev.filter((n) => n.notification_id !== payload.old.notification_id)
      );
      updateUnreadCount([...notifications]);
    }
  };

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter((n) => !n.read_status).length;
    setUnreadCount(count);
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_status: true })
        .eq('notification_id', notificationId);

      if (error) throw error;
      
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notificationId ? { ...n, read_status: true } : n
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_status: true })
        .eq('user_id', session?.user.id)
        .eq('read_status', false);

      if (error) throw error;
      
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_status: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('notification_id', notificationId);

      if (error) throw error;
      
      setNotifications((prev) =>
        prev.filter((n) => n.notification_id !== notificationId)
      );
      updateUnreadCount([...notifications]);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getFilteredNotifications = (type?: NotificationType) => {
    return type
      ? notifications.filter((n) => n.type === type)
      : notifications;
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getFilteredNotifications,
  };
}