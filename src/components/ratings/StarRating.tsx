import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
  style?: ViewStyle;
}

export function StarRating({
  rating,
  onRatingChange,
  size = 24,
  readonly = false,
  style,
}: Props) {
  const renderStar = (index: number) => {
    const filled = index < rating;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => !readonly && onRatingChange?.(index + 1)}
        disabled={readonly}
      >
        <Ionicons
          name={filled ? 'star' : 'star-outline'}
          size={size}
          color={filled ? '#FFD700' : '#666'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
});