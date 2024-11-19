import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  ModerationLog,
  Report,
  ModerationActionType,
  TargetType,
  ModerationStats,
} from '../types/Moderation';

export function useModeration() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const performModeration = async (
    actionType: ModerationActionType,
    targetId: string,
    targetType: TargetType,
    reason: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/moderation/actions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            action_type: actionType,
            target_id: targetId,
            target_type: targetType,
            reason,
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error performing moderation action:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reportContent = async (
    targetId: string,
    targetType: TargetType,
    reason: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/moderation/reports',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            target_id: targetId,
            target_type: targetType,
            reason,
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error('Error reporting content:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getPendingReports = async (): Promise<Report[]> => {
    try {
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/moderation/reports/pending',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch pending reports');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pending reports:', error);
      return [];
    }
  };

  const getModerationStats = async (): Promise<ModerationStats> => {
    try {
      const response = await fetch(
        'YOUR_GO_BACKEND_URL/api/moderation/stats',
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch moderation stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching moderation stats:', error);
      return {
        pendingReports: 0,
        totalReports: 0,
        actionsToday: 0,
        recentActions: [],
      };
    }
  };

  const getModerationHistory = async (
    targetId?: string,
    targetType?: TargetType
  ): Promise<ModerationLog[]> => {
    try {
      const params = new URLSearchParams();
      if (targetId) params.append('target_id', targetId);
      if (targetType) params.append('target_type', targetType);

      const response = await fetch(
        `YOUR_GO_BACKEND_URL/api/moderation/history?${params}`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch moderation history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching moderation history:', error);
      return [];
    }
  };

  return {
    loading,
    performModeration,
    reportContent,
    getPendingReports,
    getModerationStats,
    getModerationHistory,
  };
}