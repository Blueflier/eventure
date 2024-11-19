import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { Transaction } from '../../types';

interface Props {
  walletId?: string;
}

export function TransactionHistory({ walletId }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletId) {
      fetchTransactions();
    }
  }, [walletId]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_id', walletId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transaction}>
      <View style={styles.transactionInfo}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {format(new Date(item.created_at), 'PPp')}
        </Text>
        {item.stripe_payment_intent_id && (
          <Text style={styles.paymentId}>
            Payment ID: {item.stripe_payment_intent_id}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.amount,
          item.transaction_type === 'credit' ? styles.positive : styles.negative,
        ]}
      >
        {item.transaction_type === 'credit' ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.transaction_id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  paymentId: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#f44336',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});