import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { SettingsSection } from './SettingsSection';

interface Props {
  preferences: {
    events: boolean;
    messages: boolean;
    updates: boolean;
    marketing: boolean;
  };
  onUpdate: (preferences: any) => void;
}

export function NotificationPreferences({ preferences, onUpdate }: Props) {
  const handleToggle = (key: string, value: boolean) => {
    onUpdate({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <SettingsSection title="Notification Preferences">
      <View style={styles.option}>
        <Text style={styles.label}>Event Reminders</Text>
        <Switch
          value={preferences.events}
          onValueChange={(value) => handleToggle('events', value)}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>Messages</Text>
        <Switch
          value={preferences.messages}
          onValueChange={(value) => handleToggle('messages', value)}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>App Updates</Text>
        <Switch
          value={preferences.updates}
          onValueChange={(value) => handleToggle('updates', value)}
        />
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>Marketing</Text>
        <Switch
          value={preferences.marketing}
          onValueChange={(value) => handleToggle('marketing', value)}
        />
      </View>
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
  },
});