import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../common/Button';
import { PromotionPackage } from '../../types/EventPromotion';

interface Props {
  package: PromotionPackage;
  onSelect: () => void;
  selected?: boolean;
}

export function PromotionPackageCard({ package: pkg, onSelect, selected }: Props) {
  return (
    <View style={[styles.container, selected && styles.selected]}>
      <View style={styles.header}>
        <Text style={styles.type}>{pkg.type.toUpperCase()}</Text>
        <Text style={styles.duration}>{pkg.duration} Days</Text>
      </View>

      <Text style={styles.price}>${pkg.cost.toFixed(2)}</Text>

      <View style={styles.benefits}>
        {pkg.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.benefitText}>• {benefit}</Text>
          </View>
        ))}
      </View>

      <Button
        title={selected ? 'Selected' : 'Select Package'}
        onPress={onSelect}
        variant={selected ? 'solid' : 'outline'}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  selected: {
    borderColor: '#2e6ddf',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  benefits: {
    marginBottom: 16,
  },
  benefitItem: {
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
});