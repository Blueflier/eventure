import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NotificationList } from '../../components/notifications/NotificationList';
import { useNotifications } from '../../hooks/useNotifications';

const Tab = createMaterialTopTabNavigator();

function AllNotificationsTab() {
  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  return (
    <NotificationList
      notifications={notifications}
      loading={loading}
      onRefresh={() => {}}
      onMarkAsRead={markAsRead}
      onDelete={deleteNotification}
      onMarkAllAsRead={markAllAsRead}
    />
  );
}

function FilteredNotificationsTab({ type }: { type: string }) {
  const {
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getFilteredNotifications,
  } = useNotifications();

  const notifications = getFilteredNotifications(type as any);

  return (
    <NotificationList
      notifications={notifications}
      loading={loading}
      onRefresh={() => {}}
      onMarkAsRead={markAsRead}
      onDelete={deleteNotification}
      onMarkAllAsRead={markAllAsRead}
    />
  );
}

export default function NotificationsScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All" component={AllNotificationsTab} />
      <Tab.Screen
        name="Events"
        children={() => (
          <FilteredNotificationsTab type="event_update" />
        )}
      />
      <Tab.Screen
        name="Messages"
        children={() => (
          <FilteredNotificationsTab type="message" />
        )}
      />
      <Tab.Screen
        name="Reminders"
        children={() => (
          <FilteredNotificationsTab type="event_reminder" />
        )}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});