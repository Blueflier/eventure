import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../utils/api';
import { NotificationSettings } from '../../types/Notification';

export function NotificationSettings() {
  const { session } = useAuth();
  const [settings, setSettings] = useState<NotificationSettings>({
    pushEnabled: true,
    reminderNotifications: true,
    updateNotifications: true,
    messageNotifications: true,
    promotionNotifications: false,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get<NotificationSettings>('/api/notifications/settings');
      if (response.ok && response.data) {
        setSettings(response.data as NotificationSettings);
      } else {
        throw new Error(response.error || 'Failed to fetch settings');
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error);
    }
  };

  const updateSetting = async (key: string, value: boolean) => {
    try {
      const response = await api.put('/api/notifications/settings', {
        [key]: value,
      });
      
      if (response.ok) {
        setSettings({ ...settings, [key]: value });
      } else {
        throw new Error(response.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Switch
            value={settings.pushEnabled}
            onValueChange={(value) => updateSetting('pushEnabled', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Types</Text>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Event Reminders</Text>
          <Switch
            value={settings.reminderNotifications}
            onValueChange={(value) =>
              updateSetting('reminderNotifications', value)
            }
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Event Updates</Text>
          <Switch
            value={settings.updateNotifications}
            onValueChange={(value) =>
              updateSetting('updateNotifications', value)
            }
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Messages</Text>
          <Switch
            value={settings.messageNotifications}
            onValueChange={(value) =>
              updateSetting('messageNotifications', value)
            }
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Promotions</Text>
          <Switch
            value={settings.promotionNotifications}
            onValueChange={(value) =>
              updateSetting('promotionNotifications', value)
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
});