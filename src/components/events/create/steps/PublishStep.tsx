import React, { useState } from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../../../common/Button';
import { Event } from '../../../../types';

interface Props {
  eventData: Partial<Event>;
  setEventData: (data: Partial<Event>) => void;
  onSave: (isDraft: boolean) => void;
  onBack: () => void;
  isLastStep: boolean;
}

export function PublishStep({
  eventData,
  setEventData,
  onSave,
  onBack,
  isLastStep,
}: Props) {
  const [schedulePublish, setSchedulePublish] = useState(false);
  const [publishDate, setPublishDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.label}>Schedule Publishing</Text>
        <Switch
          value={schedulePublish}
          onValueChange={setSchedulePublish}
        />
      </View>

      {schedulePublish && (
        <DateTimePicker
          value={publishDate}
          onChange={(_, date) => date && setPublishDate(date)}
          minimumDate={new Date()}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} variant="outline" />
        <View style={styles.publishButtons}>
          <Button
            title="Save as Draft"
            onPress={() => onSave(true)}
            variant="outline"
            style={styles.draftButton}
          />
          <Button
            title="Publish Now"
            onPress={() => onSave(false)}
            disabled={schedulePublish}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  publishButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  draftButton: {
    marginRight: 10,
  },
});