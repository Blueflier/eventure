import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { LocationStep } from './steps/LocationStep';
import { TicketingStep } from './steps/TicketingStep';
import { MediaStep } from './steps/MediaStep';
import { PublishStep } from './steps/PublishStep';
import { StepIndicator } from './StepIndicator';
import { Event } from '../../../types';

interface Props {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  eventData: Partial<Event>;
  setEventData: (data: Partial<Event>) => void;
  onSave: (isDraft: boolean) => void;
}

export function CreateEventWizard({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
  onSave,
}: Props) {
  const steps = [
    {
      title: 'Basic Info',
      component: BasicInfoStep,
    },
    {
      title: 'Location',
      component: LocationStep,
    },
    {
      title: 'Ticketing',
      component: TicketingStep,
    },
    {
      title: 'Media',
      component: MediaStep,
    },
    {
      title: 'Publish',
      component: PublishStep,
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <View style={styles.container}>
      <StepIndicator
        steps={steps.map(s => s.title)}
        currentStep={currentStep}
        onStepPress={setCurrentStep}
      />
      <CurrentStepComponent
        eventData={eventData}
        setEventData={setEventData}
        onNext={() => setCurrentStep(currentStep + 1)}
        onBack={() => setCurrentStep(currentStep - 1)}
        onSave={onSave}
        isLastStep={currentStep === steps.length - 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});