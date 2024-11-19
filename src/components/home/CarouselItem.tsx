import React from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Event } from '../../types';
import { format } from 'date-fns';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

interface Props {
  event: Event;
  index: number;
  translateX: Animated.SharedValue<number>;
  onPress: () => void;
}

export function CarouselItem({ event, index, translateX, onPress }: Props) {
  const inputRange = [
    (index - 1) * WINDOW_WIDTH,
    index * WINDOW_WIDTH,
    (index + 1) * WINDOW_WIDTH,
  ];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.8, 1, 0.8]
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.itemContainer, rStyle]}>
        <Animated.Image
          source={{ uri: event.images?.[0] || 'https://placeholder.com/300x200' }}
          style={styles.image}
        />
        <Animated.View style={styles.overlay}>
          <Animated.Text style={styles.title}>{event.title}</Animated.Text>
          <Animated.Text style={styles.date}>
            {format(new Date(event.start_time), 'PPp')}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: WINDOW_WIDTH - 40,
    height: 200,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});