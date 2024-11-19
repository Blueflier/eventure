import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tutorials = [
  {
    title: 'Getting Started with Eventure',
    description: 'Learn the basics of using the app',
    videoUrl: 'YOUR_YOUTUBE_URL_1',
    icon: 'rocket-outline',
  },
  {
    title: 'Creating Your First Event',
    description: 'Step-by-step guide to event creation',
    videoUrl: 'YOUR_YOUTUBE_URL_2',
    icon: 'create-outline',
  },
  {
    title: 'Managing Event Tickets',
    description: 'Learn about ticket types and pricing',
    videoUrl: 'YOUR_YOUTUBE_URL_3',
    icon: 'ticket-outline',
  },
  {
    title: 'Promoting Your Event',
    description: 'Tips for reaching more attendees',
    videoUrl: 'YOUR_YOUTUBE_URL_4',
    icon: 'megaphone-outline',
  },
];

export function TutorialList() {
  const handleTutorialPress = (videoUrl: string) => {
    Linking.openURL(videoUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Tutorials</Text>
      <Text style={styles.description}>
        Watch our tutorials to learn how to make the most of Eventure.
      </Text>

      {tutorials.map((tutorial, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tutorialItem}
          onPress={() => handleTutorialPress(tutorial.videoUrl)}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={tutorial.icon as any} size={24} color="#2e6ddf" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
            <Text style={styles.tutorialDescription}>
              {tutorial.description}
            </Text>
          </View>
          <Ionicons name="play-circle-outline" size={24} color="#2e6ddf" />
        </TouchableOpacity>
      ))}
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
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e6effd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tutorialDescription: {
    fontSize: 14,
    color: '#666',
  },
});