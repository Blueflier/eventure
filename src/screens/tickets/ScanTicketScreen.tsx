import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { useTicketQR } from '../../hooks/useTicketQR';
import { Button } from '../../components/common/Button';

export default function ScanTicketScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { validateQRCode, loading } = useTicketQR();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    try {
      setScanned(true);
      const result = await validateQRCode(data);

      Alert.alert(
        result.success ? 'Success' : 'Error',
        result.message,
        [
          {
            text: 'OK',
            onPress: () => setScanned(false),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid QR code');
      setScanned(false);
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
  },
});