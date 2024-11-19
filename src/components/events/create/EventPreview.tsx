import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { format } from 'date-fns';
import { Event } from '../../../types';

const { width } = Dimensions.get('window');

interface Props {
  event: Event;
}

export function EventPreview({ event }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.previewTitle}>Preview</Text>
      <ScrollView style={styles.preview}>
        {event.images?.[0] && (
          <Image
            source={{ uri: event.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{event.title || 'Event Title'}</Text>

          {event.startDate && (
            <Text style={styles.date}>
              {format(new Date(event.startDate), 'PPP')}
            </Text>
          )}

          {event.location?.name && (
            <Text style={styles.location}>{event.location.name}</Text>
          )}

          <Text style={styles.description}>
            {event.description || 'Event description will appear here'}
          </Text>

          {event.ticketTypes?.map((ticket, index) => (
            <View key={index} style={styles.ticketType}>
              <Text style={styles.ticketName}>{ticket.name}</Text>
              <Text style={styles.ticketPrice}>
                ${ticket.price.toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.tagContainer}>
            {event.tags?.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  preview: {
    flex: 1,
  },
  image: {
    width,
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  ticketType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ticketName: {
    fontSize: 16,
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
});