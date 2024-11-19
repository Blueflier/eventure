import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  suggestions: string[];
  onSuggestionPress: (suggestion: string) => void;
}

export function SearchBar({
  value,
  onChangeText,
  suggestions,
  onSuggestionPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search events, tags, or organizers..."
          placeholderTextColor="#999"
        />
        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onChangeText('');
              Keyboard.dismiss();
            }}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          style={styles.suggestions}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                onSuggestionPress(item);
                Keyboard.dismiss();
              }}
            >
              <Ionicons name="search-outline" size={16} color="#666" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  suggestions: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#eee',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});