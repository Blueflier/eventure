import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { SecuritySettings } from '../../components/settings/SecuritySettings';
import { NotificationPreferences } from '../../components/settings/NotificationPreferences';
import { DisplayPreferences } from '../../components/settings/DisplayPreferences';
import { PrivacySettings } from '../../components/settings/PrivacySettings';
import { UserSettings } from '../../types';

export default function SettingsScreen() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    user_id: session?.user?.id || '',
    notification_preferences: {
      events: true,
      messages: true,
      updates: true,
      marketing: false,
    },
    theme_preference: 'system',
    language_preference: 'en',
    privacy_settings: {
      profile_visibility: true,
      show_email: false,
      allow_messages: true,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${process.env.MY_GOLANG_URL}/api/settings/${session?.user?.id}`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      Alert.alert('Error', 'Failed to load settings');
    }
  };

  const handleUpdateSettings = async (newSettings: Partial<UserSettings>) => {
    try {
      setLoading(true);
      const updatedSettings = {
        ...settings,
        ...newSettings,
        updated_at: new Date().toISOString(),
      };

      const response = await fetch(`${process.env.MY_GOLANG_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) throw new Error('Failed to update settings');
      setSettings(updatedSettings);
      Alert.alert('Success', 'Settings updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SecuritySettings />
      
      <NotificationPreferences
        preferences={settings.notification_preferences}
        onUpdate={(prefs) =>
          handleUpdateSettings({
            notification_preferences: prefs,
          })
        }
      />

      <DisplayPreferences
        theme={settings.theme_preference}
        language={settings.language_preference}
        onUpdate={(display) =>
          handleUpdateSettings({
            theme_preference: display.theme,
            language_preference: display.language,
          })
        }
      />

      <PrivacySettings
        settings={settings.privacy_settings}
        onUpdate={(privacy) =>
          handleUpdateSettings({
            privacy_settings: privacy,
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});