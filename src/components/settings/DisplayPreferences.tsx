import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SettingsSection } from './SettingsSection';

interface Props {
  theme: 'light' | 'dark' | 'system';
  language: string;
  onUpdate: (preferences: { theme: 'light' | 'dark' | 'system'; language: string }) => void;
}

export function DisplayPreferences({ theme, language, onUpdate }: Props) {
  return (
    <SettingsSection title="Display Preferences">
      <View style={styles.option}>
        <Text style={styles.label}>Theme</Text>
        <Picker
          selectedValue={theme}
          style={styles.picker}
          onValueChange={(value) => onUpdate({ theme: value as 'light' | 'dark' | 'system', language })}
        >
          <Picker.Item label="System Default" value="system" />
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(value) => onUpdate({ theme, language: value })}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="German" value="de" />
          <Picker.Item label="Chinese" value="zh" />
        </Picker>
      </View>
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  option: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});