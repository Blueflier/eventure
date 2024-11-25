import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import EventQRScannerScreen from '../screens/main/EventQRScannerScreen';
import EventDetailsScreen from '../screens/main/EventDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Auth" component={AuthNavigator} /> */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{ headerShown: true, title: 'Notifications' }}
      />
      <Stack.Screen
        name="EventQRScannerScreen"
        component={EventQRScannerScreen}
        options={{ 
          headerShown: true,
          title: 'Scan QR Code',
          headerBackTitle: 'Back'
        }}
      />
      <Stack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ headerShown: true, title: 'Event Details' }}
      />
    </Stack.Navigator>
  );
}