import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  count: number;
  size?: 'small' | 'medium' | 'large';
}

export function NotificationBadge({ count, size = 'medium' }: Props) {
  if (count <= 0) return null;

  return (
    <View style={[styles.container, styles[size]]}>
      <Text style={[styles.text, styles[`${size}Text`]]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff4444',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  small: {
    minWidth: 16,
    height: 16,
    right: -6,
    top: -4,
  },
  medium: {
    minWidth: 20,
    height: 20,
    right: -8,
    top: -6,
  },
  large: {
    minWidth: 24,
    height: 24,
    right: -10,
    top: -8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
});