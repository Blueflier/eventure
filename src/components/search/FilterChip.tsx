import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  selectedChip: {
    backgroundColor: '#2e6ddf',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  selectedLabel: {
    color: 'white',
  },
});