import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import WalletScreen from '../screens/main/WalletScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';
import { CustomDrawerContent } from '../components/navigation/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [activeTabTitle, setActiveTabTitle] = useState('Home');
  const navigationState = useNavigationState(state => state);

  // Function to get current tab route name
  const getCurrentTabTitle = () => {
    if (navigationState) {
      // Find the MainTabs route
      const mainTabsRoute = navigationState.routes.find(route => route.name === 'MainTabs');
      if (mainTabsRoute?.state?.routes) {
        // Get active tab route
        const activeTabRoute = mainTabsRoute.state.routes[mainTabsRoute.state.index || 0];
        return activeTabRoute?.name || 'Home';
      }
    }
    return 'Home';
  };

  // Update title when navigation state changes
  useEffect(() => {
    setActiveTabTitle(getCurrentTabTitle());
  }, [navigationState]);

  const MainTabsHeaderRight = () => (
    <>
      <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {/* Handle notifications */}}>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {/* Handle QR scan */}}>
        <Ionicons name="scan-outline" size={24} color="#333" />
      </TouchableOpacity>

    </>
  );

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
          headerShown: true,
          title: activeTabTitle,
          headerRight: () => <MainTabsHeaderRight />,
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