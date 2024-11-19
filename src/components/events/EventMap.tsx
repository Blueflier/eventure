import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Props {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

export function EventMap({ location }: Props) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title={location.name}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});