import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTags } from '../../hooks/useTags';
import { TagPill } from './TagPill';
import { TagWithCount } from '../../types/Tag';

interface Props {
  onTagSelect?: (tag: TagWithCount) => void;
}

export function PopularTags({ onTagSelect }: Props) {
  const [popularTags, setPopularTags] = useState<TagWithCount[]>([]);
  const { fetchPopularTags } = useTags();

  useEffect(() => {
    loadPopularTags();
  }, []);

  const loadPopularTags = async () => {
    const tags = await fetchPopularTags();
    setPopularTags(tags);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Tags</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagContainer}
      >
        {popularTags.map(tag => (
          <TagPill
            key={tag.tag_id}
            tag={tag}
            size={36}
            onRemove={onTagSelect ? () => onTagSelect(tag) : undefined}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
});