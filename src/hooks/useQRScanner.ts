import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export function useQRScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const requestCameraPermission = useCallback(async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Please enable camera access to use the QR scanner feature.',
          [{ text: 'OK' }]
        );
      }
      return status === 'granted';
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Failed to request camera permission');
      return false;
    }
  }, []);

  const handleScanPress = useCallback(async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      navigation.navigate('EventQRScannerScreen');
    }
  }, [navigation, requestCameraPermission]);

  return {
    handleScanPress,
    hasPermission,
  };
}