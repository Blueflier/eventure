import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '../../types';

interface Props {
  profile: UserProfile;
  onImagePress: () => void;
}

export function ProfileHeader({ profile, onImagePress }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onImagePress}>
        <Image
          source={{ uri: profile.profile_picture || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <View style={styles.editIconContainer}>
          <Ionicons name="camera" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.affiliation}>{profile.community_affiliation}</Text>
      
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{profile.average_rating.toFixed(1)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#2e6ddf',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  affiliation: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});