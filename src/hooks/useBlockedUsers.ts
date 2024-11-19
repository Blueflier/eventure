import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BlockedUser, BlockUserResponse } from '../types/BlockedUser';

export function useBlockedUsers() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const blockUser = async (userId: string): Promise<BlockUserResponse> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/users/block',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ blocked_user_id: userId }),
        }
      );

      const data = await response.json();
      return {
        success: response.ok,
        message: data.message || 'User blocked successfully',
      };
    } catch (error) {
      console.error('Error blocking user:', error);
      return {
        success: false,
        message: 'Failed to block user',
      };
    } finally {
      setLoading(false);
    }
  };

  const unblockUser = async (userId: string): Promise<BlockUserResponse> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/users/unblock',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ blocked_user_id: userId }),
        }
      );

      const data = await response.json();
      return {
        success: response.ok,
        message: data.message || 'User unblocked successfully',
      };
    } catch (error) {
      console.error('Error unblocking user:', error);
      return {
        success: false,
        message: 'Failed to unblock user',
      };
    } finally {
      setLoading(false);
    }
  };

  const getBlockedUsers = async (): Promise<BlockedUser[]> => {
    try {
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/users/blocked',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch blocked users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blocked users:', error);
      return [];
    }
  };

  const isUserBlocked = async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/users/blocked/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      const data = await response.json();
      return data.blocked || false;
    } catch (error) {
      console.error('Error checking blocked status:', error);
      return false;
    }
  };

  return {
    loading,
    blockUser,
    unblockUser,
    getBlockedUsers,
    isUserBlocked,
  };
}