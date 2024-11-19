import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Tag, TagWithCount } from '../types/Tag';

export function useTags() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchPopularTags = async (): Promise<TagWithCount[]> => {
    try {
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/tags/popular',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch popular tags');
      return await response.json();
    } catch (error) {
      console.error('Error fetching popular tags:', error);
      return [];
    }
  };

  const searchTags = async (query: string): Promise<Tag[]> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/tags/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      
      if (!response.ok) throw new Error('Failed to search tags');
      return await response.json();
    } catch (error) {
      console.error('Error searching tags:', error);
      return [];
    }
  };

  const createTag = async (name: string): Promise<Tag | null> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/tags',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ name }),
        }
      );
      
      if (!response.ok) throw new Error('Failed to create tag');
      return await response.json();
    } catch (error) {
      console.error('Error creating tag:', error);
      return null;
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