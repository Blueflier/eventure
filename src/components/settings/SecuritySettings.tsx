import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { SettingsSection } from './SettingsSection';
import { api } from '../../utils/api';

export function SecuritySettings() {
  const { session } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (!currentPassword || !newPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    try {
      setLoading(true);
      const response = await api.put('/auth/password', {
        currentPassword,
        newPassword,
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      Alert.alert('Success', 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleSetup2FA = async () => {
    // Implement 2FA setup logic
    Alert.alert('Coming Soon', '2FA setup will be available soon');
  };

  return (
    <SettingsSection title="Security">
      <View style={styles.form}>
        <Input
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <Input
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <Input
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button
          title="Change Password"
          onPress={handleChangePassword}
          loading={loading}
          style={styles.button}
        />
        <Button
          title="Setup Two-Factor Authentication"
          onPress={handleSetup2FA}
          variant="outline"
          style={styles.button}
        />
      </View>
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 15,
  },
  button: {
    marginTop: 10,
  },
});