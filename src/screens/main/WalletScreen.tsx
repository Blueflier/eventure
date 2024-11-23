import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { WalletBalance } from '../../components/wallet/WalletBalance';
import { CurrencyPackages } from '../../components/wallet/CurrencyPackages';
import { TransactionHistory } from '../../components/wallet/TransactionHistory';
import { Wallet } from '../../types';

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
      const response = await fetch('YOUR_GO_BACKEND_URL/api/wallet', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch wallet');
      const data = await response.json();
      setWallet(data);
    } catch (error) {
      console.error('Error fetching wallet:', error);
    }
  };

  const handlePurchase = async (amount: number, coins: number) => {
    try {
      setLoading(true);

      const response = await fetch('YOUR_GO_BACKEND_URL/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          amount,
          currency: wallet?.currency || 'USD',
          coins,
          wallet_id: wallet?.wallet_id,
        }),
      });

      const { clientSecret, ephemeralKey, customer } = await response.json();

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
      Alert.alert('Error', 'Unable to process payment');
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