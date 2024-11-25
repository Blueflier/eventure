import { useState } from 'react';
import { api } from '../utils/api';
import { Tag, TagWithCount } from '../types/Tag';

export function useTags() {
  const [loading, setLoading] = useState(false);

  const fetchPopularTags = async (): Promise<TagWithCount[]> => {
    const response = await api.get<TagWithCount[]>('/api/tags/popular');
    if (!response.ok) {
      console.error('Error fetching popular tags:', response.error);
      return [];
    }
    return response.data ?? [];
  };

  const searchTags = async (query: string): Promise<Tag[]> => {
    const response = await api.get<Tag[]>(`/api/tags/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      console.error('Error searching tags:', response.error);
      return [];
    }
    return response.data ?? [];
  };

  const createTag = async (name: string): Promise<Tag | null> => {
    try {
      setLoading(true);
      const response = await api.post<Tag>('/api/tags', { name });
      if (!response.ok) {
        console.error('Error creating tag:', response.error);
        return null;
      }
      return response.data ?? null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchPopularTags,
    searchTags,
    createTag,
  };
}