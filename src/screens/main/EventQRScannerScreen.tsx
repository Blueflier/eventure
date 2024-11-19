import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAttendance } from '../../hooks/useAttendance';
import { Button } from '../../components/common/Button';

export default function EventQRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const eventId = route.params?.eventId;
  const { loading, markAttendance } = useAttendance(eventId);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    try {
      setScanned(true);
      const userId = JSON.parse(data).userId;
      const success = await markAttendance(userId);

      if (success) {
        Alert.alert('Success', 'Attendance marked successfully');
      } else {
        Alert.alert('Error', 'Failed to mark attendance');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid QR code');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button
            title="Scan Again"
            onPress={() => setScanned(false)}
            loading={loading}
          />
          <Button
            title="View Attendance"
            onPress={() => navigation.navigate('EventAttendance', { eventId })}
            variant="outline"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanner: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    gap: 10,
  },
});