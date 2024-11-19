import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useTags } from '../../hooks/useTags';
import { Tag } from '../../types/Tag';
import { TagPill } from './TagPill';

interface Props {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  maxTags?: number;
}

export function TagInput({ selectedTags, onTagsChange, maxTags = 5 }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const { searchTags, createTag, loading } = useTags();

  useEffect(() => {
    if (query.trim()) {
      searchTags(query).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleTagSelect = async (tag: Tag) => {
    if (selectedTags.length < maxTags && !selectedTags.find(t => t.tag_id === tag.tag_id)) {
      onTagsChange([...selectedTags, tag]);
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleCreateTag = async () => {
    if (query.trim() && selectedTags.length < maxTags) {
      const newTag = await createTag(query.trim());
      if (newTag) {
        onTagsChange([...selectedTags, newTag]);
        setQuery('');
        setSuggestions([]);
      }
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter(tag => tag.tag_id !== tagId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedTags}>
        {selectedTags.map(tag => (
          <TagPill
            key={tag.tag_id}
            tag={tag}
            onRemove={() => handleRemoveTag(tag.tag_id)}
          />
        ))}
      </View>

      {selectedTags.length < maxTags && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Add tags..."
            placeholderTextColor="#999"
          />
          {query.trim() && (
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateTag}
              disabled={loading}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => item.tag_id}
          style={styles.suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleTagSelect(item)}
            >
              <Text style={styles.suggestionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  createButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2e6ddf',
    borderRadius: 4,
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestions: {
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
});