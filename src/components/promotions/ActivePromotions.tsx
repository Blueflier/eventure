import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { format } from 'date-fns';
import { EventPromotion } from '../../types/EventPromotion';
import { Button } from '../common/Button';

interface Props {
  promotions: EventPromotion[];
  onCancel: (promotionId: string) => void;
  loading?: boolean;
}

export function ActivePromotions({ promotions, onCancel, loading }: Props) {
  if (promotions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No active promotions</Text>
      </View>
    );
  }

  const renderPromotion = ({ item }: { item: EventPromotion }) => (
    <View style={styles.promotionItem}>
      <View style={styles.promotionHeader}>
        <Text style={styles.promotionType}>
          {item.promotion_type.toUpperCase()}
        </Text>
        <Text style={styles.cost}>
          ${item.cost_in_currency.toFixed(2)}
        </Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Active Period:</Text>
        <Text style={styles.dateText}>
          {format(new Date(item.start_time), 'PPP')} -{' '}
          {format(new Date(item.end_time), 'PPP')}
        </Text>
      </View>

      <Button
        title="Cancel Promotion"
        onPress={() => onCancel(item.promotion_id)}
        variant="outline"
        loading={loading}
        style={styles.cancelButton}
      />
    </View>
  );

  return (
    <FlatList
      data={promotions}
      renderItem={renderPromotion}
      keyExtractor={(item) => item.promotion_id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  promotionItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promotionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  promotionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  cost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
  },
  cancelButton: {
    marginTop: 8,
  },
});