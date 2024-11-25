import { useState } from 'react';
import { api } from '../utils/api';
import { BlockedUser, BlockUserResponse } from '../types/BlockedUser';

export function useBlockedUsers() {
  const [loading, setLoading] = useState(false);

  const blockUser = async (userId: string): Promise<BlockUserResponse> => {
    try {
      setLoading(true);
      const response = await api.post<BlockUserResponse>('/api/users/block', {
        blocked_user_id: userId,
      });

      return {
        success: response.ok,
        message: response.data?.message || 'User blocked successfully',
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
      const response = await api.post<BlockUserResponse>('/api/users/unblock', {
        blocked_user_id: userId,
      });

      return {
        success: response.ok,
        message: response.data?.message || 'User unblocked successfully',
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
      const response = await api.get<BlockedUser[]>('/api/users/blocked');
      if (!response.ok) throw new Error('Failed to fetch blocked users');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching blocked users:', error);
      return [];
    }
  };

  const isUserBlocked = async (userId: string): Promise<boolean> => {
    try {
      const response = await api.get<{ blocked: boolean }>(`/api/users/blocked/${userId}`);
      return response.data?.blocked || false;
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