import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import WalletScreen from '../screens/main/WalletScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';
import { CustomDrawerContent } from '../components/navigation/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
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
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: 'Home',
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