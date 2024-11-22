import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Slider } from '@miblanchard/react-native-slider';
import { Button } from '../common/Button';
import { FilterChip } from './FilterChip';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

interface Props {
  filters: {
    dateRange: { start: Date | null; end: Date | null };
    priceRange: { min: number; max: number };
    distance: number;
    eventType: string[];
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function FilterSheet({ filters, onFiltersChange }: Props) {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);

  const eventTypes = [
    'Academic',
    'Social',
    'Sports',
    'Cultural',
    'Career',
    'Workshop',
  ];

  const sortOptions = [
    { label: 'Date', value: 'date' },
    { label: 'Price', value: 'price' },
    { label: 'Distance', value: 'distance' },
    { label: 'Popularity', value: 'popularity' },
  ];

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <Button
        title="Filters"
        variant="outline"
        onPress={handlePresentPress}
        style={styles.filterButton}
      />
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['85%']}
        index={0}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Date Range</Text>
          <DateTimePicker
            mode="range"
            startDate={filters.dateRange.start ? dayjs(filters.dateRange.start) : null}
            endDate={filters.dateRange.end ? dayjs(filters.dateRange.end) : null}
            onChange={({ startDate, endDate }) =>
              onFiltersChange({
                ...filters,
                dateRange: {
                  start: startDate ? dayjs(startDate).toDate() : null, // Explicit conversion
                  end: endDate ? dayjs(endDate).toDate() : null // Explicit conversion
                }
              })
            }
            selectedItemColor="#0047FF"
            displayFullDays
          />


          <Text style={styles.sectionTitle}>Price Range</Text>
          <Slider
            value={[filters.priceRange.min, filters.priceRange.max]}
            onValueChange={(values) =>
              onFiltersChange({
                ...filters,
                priceRange: {
                  min: values[0],
                  max: values[1],
                },
              })
            }
            minimumValue={0}
            maximumValue={1000}
          />

          <Text style={styles.sectionTitle}>Distance (miles)</Text>
          <Slider
            value={filters.distance}
            onValueChange={([value]) =>
              onFiltersChange({
                ...filters,
                distance: value,
              })
            }
            minimumValue={1}
            maximumValue={50}
          />

          <Text style={styles.sectionTitle}>Event Type</Text>
          <View style={styles.chipContainer}>
            {eventTypes.map((type) => (
              <FilterChip
                key={type}
                label={type}
                selected={filters.eventType.includes(type)}
                onPress={() => {
                  const newTypes = filters.eventType.includes(type)
                    ? filters.eventType.filter((t) => t !== type)
                    : [...filters.eventType, type];
                  onFiltersChange({
                    ...filters,
                    eventType: newTypes,
                  });
                }}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Sort By</Text>
          <View style={styles.chipContainer}>
            {sortOptions.map((option) => (
              <FilterChip
                key={option.value}
                label={option.label}
                selected={filters.sortBy === option.value}
                onPress={() =>
                  onFiltersChange({
                    ...filters,
                    sortBy: option.value,
                  })
                }
              />
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    margin: 10,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
});