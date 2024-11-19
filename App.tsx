import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

const Stack = createNativeStackNavigator();

function NavigationWrapper() {
  const { session } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationWrapper />
    </AuthProvider>
  );
}