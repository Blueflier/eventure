import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Event } from '../../types';
import { CarouselItem } from './CarouselItem';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

interface Props {
  events: Event[];
  onEventPress: (event: Event) => void;
}

export function FeaturedCarousel({ events, onEventPress }: Props) {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Events</Text>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {events.map((event, index) => (
          <CarouselItem
            key={event.event_id}
            event={event}
            index={index}
            translateX={translateX}
            onPress={() => onEventPress(event)}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});