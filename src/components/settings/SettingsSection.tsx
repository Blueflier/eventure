import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../common/Button';

interface Props {
  title: string;
  children: React.ReactNode;
  buttonTitle?: string;
  buttonColor?: string;
  onPress?: () => void;
}

export function SettingsSection({
  title,
  children,
  buttonTitle,
  buttonColor,
  onPress,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
      {buttonTitle && (
        <Button
          title={buttonTitle}
          onPress={onPress}
          style={[
            styles.button,
            buttonColor && { backgroundColor: buttonColor },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});