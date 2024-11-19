import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRatings } from '../../hooks/useRatings';
import { RatingModal } from '../ratings/RatingModal';
import { RatingStats } from '../ratings/RatingStats';
import { StarRating } from '../ratings/StarRating';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  organizerId: string;
}

export function OrganizerProfile({ organizerId }: Props) {
  const { session } = useAuth();
  const [organizer, setOrganizer] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { loading, stats, submitRating, fetchRatingStats } = useRatings(organizerId);

  useEffect(() => {
    fetchOrganizerDetails();
    fetchRatingStats();
  }, [organizerId]);

  const fetchOrganizerDetails = async () => {
    try {
      const response = await fetch(`YOUR_GO_BACKEND_URL/api/users/${organizerId}`);
      const data = await response.json();
      setOrganizer(data);
    } catch (error) {
      console.error('Error fetching organizer details:', error);
    }
  };

  const handleRatingSubmit = async (rating: number, comment: string) => {
    const success = await submitRating(rating, comment);
    if (success) {
      setModalVisible(false);
    }
  };

  if (!organizer) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: organizer.avatarUrl }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{organizer.name}</Text>
          <StarRating
            rating={Math.round(stats.averageRating)}
            readonly
            size={16}
          />
          <Text style={styles.ratingCount}>
            ({stats.totalRatings} ratings)
          </Text>
        </View>
      </View>

      <RatingStats stats={stats} />

      {session?.user?.id !== organizerId && (
        <Pressable
          style={styles.rateButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.rateButtonText}>Rate Organizer</Text>
        </Pressable>
      )}

      <RatingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleRatingSubmit}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rateButton: {
    backgroundColor: '#2e6ddf',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  rateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});