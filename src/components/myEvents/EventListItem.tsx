import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { Event } from '../../types';

interface Props {
  event: Event;
  isOrganizer?: boolean;
}

export function EventListItem({ event, isOrganizer = false }: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (isOrganizer) {
      navigation.navigate('EventDashboard', { event });
    } else {
      navigation.navigate('EventDetails', { event });
    }
  };

  const handleQRCode = () => {
    navigation.navigate('EventQRCode', { event });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{ uri: event.images?.[0] || 'https://placeholder.com/100x100' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.date}>
          {format(new Date(event.startDate), 'PPP')}
        </Text>
        {event.status === 'draft' && (
          <View style={styles.draftBadge}>
            <Text style={styles.draftText}>Draft</Text>
          </View>
        )}
      </View>
      {isOrganizer && (
        <TouchableOpacity
          style={styles.qrButton}
          onPress={handleQRCode}
        >
          <Ionicons name="qr-code-outline" size={24} color="#2e6ddf" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  draftBadge: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  draftText: {
    fontSize: 12,
    color: '#000',
  },
  qrButton: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
});