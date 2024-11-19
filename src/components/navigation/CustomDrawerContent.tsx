import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export function CustomDrawerContent(props: any) {
  const { session, signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image
          source={{ uri: session?.user?.user_metadata?.avatar_url }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {session?.user?.user_metadata?.full_name || 'User'}
        </Text>
        <Text style={styles.email}>{session?.user?.email}</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.separator} />

      <DrawerItem
        label="Sign Out"
        onPress={signOut}
        icon={({ color }) => (
          <Ionicons name="log-out-outline" size={22} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});