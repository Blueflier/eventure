import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../../common/Button';
import { Event, EventImage } from '../../../../types';
import { supabase } from '../../../../lib/supabase';

interface Props {
  eventData: Partial<Event>;
  setEventData: (data: Partial<Event>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function MediaStep({ eventData, setEventData, onNext, onBack }: Props) {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);
      const filename = `${Date.now()}.jpg`;
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(`${eventData.event_id}/${filename}`, blob);

      if (error) throw error;

      const imageUrl = supabase.storage
        .from('event-images')
        .getPublicUrl(`${eventData.event_id}/${filename}`).data.publicUrl;

      const newImage: EventImage = {
        image_id: data.path,
        event_id: eventData.event_id || '',
        image_url: imageUrl,
        created_at: new Date().toISOString(),
      };

      setEventData({
        ...eventData,
        images: [...(eventData.images || []), newImage],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (imageId: string) => {
    try {
      const { error } = await supabase.storage
        .from('event-images')
        .remove([imageId]);

      if (error) throw error;

      setEventData({
        ...eventData,
        images: eventData.images?.filter(img => img.image_id !== imageId) || [],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to remove image');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageGrid}>
        {eventData.images?.map((image) => (
          <View key={image.image_id} style={styles.imageContainer}>
            <Image source={{ uri: image.image_url }} style={styles.image} />
            <Button
              title="Remove"
              onPress={() => removeImage(image.image_id)}
              variant="outline"
              style={styles.removeButton}
            />
          </View>
        ))}
      </View>

      {(eventData.images?.length || 0) < 3 && (
        <Button
          title={uploading ? 'Uploading...' : 'Add Image'}
          onPress={pickImage}
          disabled={uploading}
          style={styles.addButton}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="outline" />
        <Button
          title="Next"
          onPress={onNext}
          disabled={!eventData.images?.length}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: '48%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  removeButton: {
    marginTop: 5,
  },
  addButton: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});