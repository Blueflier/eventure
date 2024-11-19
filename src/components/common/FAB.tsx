import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function FAB({ icon, onPress, style }: Props) {
  return (
    <TouchableOpacity
      style={[styles.fab, style]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2e6ddf',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});