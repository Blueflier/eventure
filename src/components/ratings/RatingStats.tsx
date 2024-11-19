import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RatingStats as Stats } from '../../types/Rating';
import { StarRating } from './StarRating';

interface Props {
  stats: Stats;
}

export function RatingStats({ stats }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.averageRating}>
          {stats.averageRating.toFixed(1)}
        </Text>
        <StarRating
          rating={Math.round(stats.averageRating)}
          readonly
          style={styles.stars}
        />
        <Text style={styles.totalRatings}>
          {stats.totalRatings} {stats.totalRatings === 1 ? 'rating' : 'ratings'}
        </Text>
      </View>

      <View style={styles.distribution}>
        {[5, 4, 3, 2, 1].map((star) => (
          <View key={star} style={styles.distributionRow}>
            <Text style={styles.starLabel}>{star}</Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${(stats.ratingDistribution[star] / stats.totalRatings) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.count}>
              {stats.ratingDistribution[star] || 0}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  stars: {
    marginVertical: 8,
  },
  totalRatings: {
    fontSize: 14,
    color: '#666',
  },
  distribution: {
    gap: 8,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starLabel: {
    width: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  count: {
    width: 30,
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});