import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import { useNotifications } from './useNotifications';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export function useNotificationHandler() {
  const navigation = useNavigation<NavigationProp>();
  const { unreadCount } = useNotifications();

  const handleNotificationsPress = useCallback(() => {
    navigation.navigate('NotificationsScreen');
  }, [navigation]);

  return {
    handleNotificationsPress,
    unreadCount,
  };
}