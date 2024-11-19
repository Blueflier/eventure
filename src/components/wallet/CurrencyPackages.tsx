import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onPurchase: (amount: number, coins: number) => void;
  loading: boolean;
}

const packages = [
  { coins: 100, price: 0.99, popular: false },
  { coins: 500, price: 4.99, popular: true },
  { coins: 1000, price: 9.99, popular: false },
  { coins: 2000, price: 19.99, popular: false },
];

export function CurrencyPackages({ onPurchase, loading }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purchase Coins</Text>
      <View style={styles.packagesContainer}>
        {packages.map((pkg) => (
          <TouchableOpacity
            key={pkg.coins}
            style={[styles.package, pkg.popular && styles.popularPackage]}
            onPress={() => onPurchase(pkg.price * 100, pkg.coins)}
            disabled={loading}
          >
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Best Value</Text>
              </View>
            )}
            <Ionicons
              name="cash-outline"
              size={24}
              color={pkg.popular ? '#fff' : '#2e6ddf'}
            />
            <Text style={[styles.coins, pkg.popular && styles.popularText]}>
              {pkg.coins} Coins
            </Text>
            <Text style={[styles.price, pkg.popular && styles.popularText]}>
              ${pkg.price}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  packagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  package: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  popularPackage: {
    backgroundColor: '#2e6ddf',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
  },
  popularText: {
    color: '#fff',
  },
  coins: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#2e6ddf',
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});