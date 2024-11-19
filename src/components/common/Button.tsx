import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'solid',
  loading = false,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outline' && styles.outlineButton,
        style,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2e6ddf' : 'white'} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'outline' && styles.outlineText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2e6ddf',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2e6ddf',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineText: {
    color: '#2e6ddf',
  },
});