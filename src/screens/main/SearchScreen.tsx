import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from '../../components/search/SearchBar';
import { FilterSheet } from '../../components/search/FilterSheet';
import { SearchResults } from '../../components/search/SearchResults';
import { useDebounce } from '../../hooks/useDebounce';
import { Event } from '../../types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    priceRange: { min: 0, max: 1000 },
    distance: 10,
    eventType: [],
    sortBy: 'date',
  });
  const [results, setResults] = useState<Event[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(query, 300);

  const searchEvents = useCallback(async () => {
    if (!debouncedSearch.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/search?q=${encodeURIComponent(
          debouncedSearch
        )}&${new URLSearchParams(filters as any).toString()}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters]);

  const fetchSuggestions = useCallback(async () => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/events/suggestions?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Suggestions error:', error);
    }
  }, [query]);

  React.useEffect(() => {
    searchEvents();
  }, [debouncedSearch, filters]);

  React.useEffect(() => {
    fetchSuggestions();
  }, [query]);

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        suggestions={suggestions}
        onSuggestionPress={(suggestion) => setQuery(suggestion)}
      />
      <FilterSheet filters={filters} onFiltersChange={setFilters} />
      <SearchResults results={results} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});