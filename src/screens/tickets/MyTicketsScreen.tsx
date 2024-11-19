import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTicketPurchase } from '../../hooks/useTicketPurchase';
import { TicketPurchaseCard } from '../../components/tickets/TicketPurchaseCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export default function MyTicketsScreen() {
  const [purchases, setPurchases] = useState([]);
  const { getUserPurchases, loading } = useTicketPurchase();

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    const userPurchases = await getUserPurchases();
    setPurchases(userPurchases);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={purchases}
        renderItem={({ item }) => <TicketPurchaseCard purchase={item} />}
        keyExtractor={(item) => item.ticket_purchase_id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
});