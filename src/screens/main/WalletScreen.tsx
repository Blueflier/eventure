import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { WalletBalance } from '../../components/wallet/WalletBalance';
import { CurrencyPackages } from '../../components/wallet/CurrencyPackages';
import { TransactionHistory } from '../../components/wallet/TransactionHistory';
import { Wallet } from '../../types';
import { api } from '../../utils/api';

export default function WalletScreen() {
  const { session } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const response = await api.get<Wallet>('/api/wallet');
      if (!response.ok) throw new Error(response.error);
      setWallet(response.data!);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const handlePurchase = async (amount: number, coins: number) => {
    try {
      setLoading(true);

      const response = await api.post('/api/create-payment-intent', {
        amount,
        currency: wallet?.currency || 'USD',
        coins,
        wallet_id: wallet?.wallet_id,
      });

      if (!response.ok) throw new Error(response.error);
      const { clientSecret, ephemeralKey, customer } = response.data;

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Eventure',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: clientSecret,
        allowsDelayedPaymentMethods: false,
      });

      if (initError) {
        Alert.alert('Error', 'Unable to initialize payment sheet');
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Alert.alert('Error', presentError.message);
        return;
      }

      Alert.alert('Success', 'Payment successful!');
      fetchWallet();
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Unable to process payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <WalletBalance wallet={wallet} />
      <CurrencyPackages onPurchase={handlePurchase} loading={loading} />
      <TransactionHistory walletId={wallet?.wallet_id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});