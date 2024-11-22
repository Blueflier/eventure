import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tag } from '../../types/Tag';

interface Props {
  tag: Tag;
  onRemove?: () => void;
  size?: number;
}

export function TagPill({ tag, onRemove, size = 32 }: Props) {
  return (
    <View style={[styles.container, styles[size]]}>
      <Text style={[styles.text, styles[`${size}Text`]]}>{tag.name}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Ionicons
            name="close-circle"
            size={size === 24 ? 14 : size === 32 ? 16 : 18}
            color="#666"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  small: {
    paddingVertical: 4,
  },
  medium: {
    paddingVertical: 6,
  },
  large: {
    paddingVertical: 8,
  },
  text: {
    color: '#333',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 4,
  },
});

export const TAG_SIZES = {
  small: 24,
  medium: 32,
  large: 40,
} as const;