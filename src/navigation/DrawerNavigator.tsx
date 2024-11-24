import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';
import WalletScreen from '../screens/main/WalletScreen';
import { CustomDrawerContent } from '../components/navigation/CustomDrawerContent';
import { QuickActions } from '../components/home/QuickActions';
import { useQRScanner } from '../hooks/useQRScanner';
import { useNotificationHandler } from '../hooks/useNotificationHandler';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { handleScanPress } = useQRScanner();
  const { handleNotificationsPress } = useNotificationHandler();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#e6effd',
        drawerActiveTintColor: '#2e6ddf',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="HomeContent"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <QuickActions
              onScanPress={handleScanPress}
              onNotificationsPress={handleNotificationsPress}
            />
          ),
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{
          title: 'Help & Support',
          drawerIcon: ({ color }) => (
            <Ionicons name="help-circle-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}