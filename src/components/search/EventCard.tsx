import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Event } from '../../types';
import { format } from 'date-fns';

interface Props {
  event: Event;
  style?: ViewStyle;
}

export function EventCard({ event, style }: Props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={() => navigation.navigate('EventDetails', { event })}
    >
      <Image
        source={{ uri: event.images?.[0] || 'https://placeholder.com/300x200' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.date}>
          {format(new Date(event.startDate), 'MMM d, yyyy')}
        </Text>
        <Text style={styles.price}>
          {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e6ddf',
  },
});