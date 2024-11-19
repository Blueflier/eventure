import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { EventImage } from '../../types';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

interface Props {
  images: EventImage[];
  onImagePress?: (image: EventImage) => void;
}

export function ImageGallery({ images, onImagePress }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image) => (
          <TouchableOpacity
            key={image.image_id}
            onPress={() => onImagePress?.(image)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: image.image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  image: {
    width: WINDOW_WIDTH,
    height: 300,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
  },
});