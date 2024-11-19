import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  count: number;
}

export function TabBadge({ count }: Props) {
  if (count <= 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});