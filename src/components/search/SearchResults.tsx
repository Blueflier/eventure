import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Event } from '../../types';
import { EventCard } from './EventCard';

const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 10;
const cardWidth = (width - (numColumns + 1) * gap) / numColumns;

interface Props {
  results: Event[];
  loading: boolean;
}

export function SearchResults({ results, loading }: Props) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e6ddf" />
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <EventCard event={item} style={{ width: cardWidth }} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: gap,
  },
});