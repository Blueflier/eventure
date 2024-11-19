import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Wallet } from '../../types';

interface Props {
  wallet: Wallet | null;
}

export function WalletBalance({ wallet }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Ionicons name="wallet" size={32} color="#2e6ddf" />
        <View style={styles.textContainer}>
          <Text style={styles.label}>Current Balance</Text>
          <Text style={styles.balance}>
            {wallet?.balance.toFixed(2)} {wallet?.currency || 'USD'}
          </Text>
        </View>
      </View>
      <Text style={styles.info}>
        Use your balance to promote events, unlock premium features, and more!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    margin: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  info: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
});