import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../../../common/Input';
import { RichTextEditor } from '../../../common/RichTextEditor';
import { DateTimePicker } from '../../../common/DateTimePicker';
import { RecurrenceSelector } from '../RecurrenceSelector';
import { TagInput } from '../../../components/tags/TagInput';
import { Button } from '../../../common/Button';
import { Event } from '../../../../types';
import { Tag } from '../../../../types/Tag';

interface Props {
  eventData: Partial<Event>;
  setEventData: (data: Partial<Event>) => void;
  onNext: () => void;
}

export function BasicInfoStep({ eventData, setEventData, onNext }: Props) {
  const handleDateChange = (type: 'start' | 'end', date: Date) => {
    setEventData({
      ...eventData,
      [type === 'start' ? 'startDate' : 'endDate']: date.toISOString(),
    });
  };

  const handleTagsChange = (tags: Tag[]) => {
    setEventData({
      ...eventData,
      tags,
    });
  };

  return (
    <View style={styles.container}>
      <Input
        label="Event Title"
        value={eventData.title}
        onChangeText={(title) => setEventData({ ...eventData, title })}
        placeholder="Enter event title"
      />

      <RichTextEditor
        label="Description"
        value={eventData.description}
        onChange={(description) => setEventData({ ...eventData, description })}
        style={styles.description}
      />

      <DateTimePicker
        label="Start Date & Time"
        value={new Date(eventData.startDate || Date.now())}
        onChange={(date) => handleDateChange('start', date)}
      />

      <DateTimePicker
        label="End Date & Time"
        value={new Date(eventData.endDate || Date.now())}
        onChange={(date) => handleDateChange('end', date)}
        minimumDate={new Date(eventData.startDate || Date.now())}
      />

      <RecurrenceSelector
        value={eventData.recurrence}
        onChange={(recurrence) => setEventData({ ...eventData, recurrence })}
        eventStartDate={eventData.startDate || new Date().toISOString()}
      />

      <TagInput
        selectedTags={eventData.tags || []}
        onTagsChange={handleTagsChange}
      />

      <Button
        title="Next"
        onPress={onNext}
        disabled={!eventData.title || !eventData.description}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  description: {
    height: 200,
  },
});