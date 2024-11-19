import React from 'react';
import { TextInput, Text, View, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  style, 
  ...props 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error ? styles.errorInput : undefined,
          style
        ]}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 5,
  },
}); 