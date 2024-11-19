import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { SettingsSection } from './SettingsSection';

interface PrivacySettingsData {
  profile_visibility: boolean;
  show_email: boolean;
  allow_messages: boolean;
}

interface Props {
  settings: PrivacySettingsData;
  onUpdate: (settings: PrivacySettingsData) => void;
}

export function PrivacySettings({ settings, onUpdate }: Props) {
  const handleToggle = (key: keyof PrivacySettingsData) => {
    onUpdate({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <SettingsSection title="Privacy Settings">
      <View style={styles.option}>
        <Text style={styles.label}>Public Profile</Text>
        <Switch
          value={settings.profile_visibility}
          onValueChange={() => handleToggle('profile_visibility')}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Show Email</Text>
        <Switch
          value={settings.show_email}
          onValueChange={() => handleToggle('show_email')}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Allow Messages</Text>
        <Switch
          value={settings.allow_messages}
          onValueChange={() => handleToggle('allow_messages')}
        />
      </View>

      <Text style={styles.description}>
        Control who can see your profile information and how they can interact with you.
      </Text>
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
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});