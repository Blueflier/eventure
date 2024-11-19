import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onScanPress: () => void;
  onNotificationsPress: () => void;
}

export function QuickActions({ onScanPress, onNotificationsPress }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onNotificationsPress}
      >
        <Ionicons name="notifications-outline" size={24} color="#2e6ddf" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onScanPress}>
        <Ionicons name="qr-code-outline" size={24} color="#2e6ddf" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});