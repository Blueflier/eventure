import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AttendingEvents } from '../../components/myEvents/AttendingEvents';
import { OrganizedEvents } from '../../components/myEvents/OrganizedEvents';
import { useAuth } from '../../contexts/AuthContext';
import { FAB } from '../../components/common/FAB';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function MyEventsScreen() {
  const { session } = useAuth();
  const navigation = useNavigation();

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Attending" component={AttendingEvents} />
        <Tab.Screen name="Organizing" component={OrganizedEvents} />
      </Tab.Navigator>
      <FAB
        icon="add"
        onPress={handleCreateEvent}
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});