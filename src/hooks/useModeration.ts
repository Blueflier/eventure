import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  ModerationLog,
  Report,
  ModerationActionType,
  TargetType,
  ModerationStats,
} from '../types/Moderation';
import { api } from '../utils/api';

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
      const response = await api.post('/api/moderation/actions', {
        action_type: actionType,
        target_id: targetId,
        target_type: targetType,
        reason,
      });
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
      const response = await api.post('/api/moderation/reports', {
        target_id: targetId,
        target_type: targetType,
        reason,
      });
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
      const response = await api.get<Report[]>('/api/moderation/reports/pending');
      if (!response.ok) throw new Error('Failed to fetch pending reports');
      return response.data ?? [];
    } catch (error) {
      console.error('Error fetching pending reports:', error);
      return [];
    }
  };

  const getModerationStats = async (): Promise<ModerationStats> => {
    try {
      const response = await api.get<ModerationStats>('/api/moderation/stats');
      if (!response.ok) throw new Error('Failed to fetch moderation stats');
      return response.data ?? {
        pendingReports: 0,
        totalReports: 0,
        actionsToday: 0,
        recentActions: [],
      };
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

      const response = await api.get<ModerationLog[]>(
        `/api/moderation/history?${params}`
      );
      if (!response.ok) throw new Error('Failed to fetch moderation history');
      return response.data ?? [];
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