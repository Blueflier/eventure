import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Input } from '../../../common/Input';
import { Button } from '../../../common/Button';
import { Event } from '../../../../types';
import * as Location from 'expo-location';

interface Props {
  eventData: Partial<Event>;
  setEventData: (data: Partial<Event>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationStep({
  eventData,
  setEventData,
  onNext,
  onBack,
}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      }
    })();
  }, []);

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setEventData({
      ...eventData,
      location: {
        ...eventData.location,
        latitude,
        longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Input
        label="Search Location"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search for a venue or address"
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.coords.latitude || 37.78825,
          longitude: userLocation?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {eventData.location && (
          <Marker
            coordinate={{
              latitude: eventData.location.latitude,
              longitude: eventData.location.longitude,
            }}
            title={eventData.location.name}
          />
        )}
      </MapView>

      <Input
        label="Venue Name"
        value={eventData.location?.name}
        onChangeText={(name) =>
          setEventData({
            ...eventData,
            location: { ...eventData.location, name },
          })
        }
        placeholder="Enter venue name"
      />

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="outline" />
        <Button
          title="Next"
          onPress={onNext}
          disabled={!eventData.location?.name}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  map: {
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});