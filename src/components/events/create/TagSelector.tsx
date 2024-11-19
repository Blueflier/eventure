import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';

interface Props {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: Props) {
  const [newTag, setNewTag] = useState('');

  const suggestedTags = [
    'Academic',
    'Social',
    'Sports',
    'Cultural',
    'Career',
    'Workshop',
    'Free Food',
    'Networking',
  ];

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tags</Text>
      
      <View style={styles.inputContainer}>
        <Input
          value={newTag}
          onChangeText={setNewTag}
          placeholder="Add a tag"
          style={styles.input}
        />
        <Button
          title="Add"
          onPress={() => handleAddTag(newTag)}
          disabled={!newTag.trim()}
          style={styles.addButton}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tagContainer}
      >
        {selectedTags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <Button
              title="×"
              onPress={() => handleRemoveTag(tag)}
              style={styles.removeButton}
            />
          </View>
        ))}
      </ScrollView>

      <Text style={styles.suggestedLabel}>Suggested Tags</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.suggestedContainer}
      >
        {suggestedTags.map((tag) => (
          <Button
            key={tag}
            title={tag}
            onPress={() => handleAddTag(tag)}
            disabled={selectedTags.includes(tag)}
            variant="outline"
            style={styles.suggestedTag}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    width: 80,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  tagText: {
    marginRight: 5,
  },
  removeButton: {
    width: 20,
    height: 20,
    padding: 0,
  },
  suggestedLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
  },
  suggestedContainer: {
    flexDirection: 'row',
  },
  suggestedTag: {
    marginRight: 10,
  },
});