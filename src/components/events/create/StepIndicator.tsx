import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  steps: string[];
  currentStep: number;
  onStepPress: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepPress }: Props) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <TouchableOpacity
            style={[
              styles.step,
              index === currentStep && styles.activeStep,
              index < currentStep && styles.completedStep,
            ]}
            onPress={() => onStepPress(index)}
          >
            <Text
              style={[
                styles.stepText,
                (index === currentStep || index < currentStep) &&
                  styles.activeStepText,
              ]}
            >
              {index + 1}
            </Text>
          </TouchableOpacity>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.connector,
                index < currentStep && styles.activeConnector,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  activeStep: {
    backgroundColor: '#2e6ddf',
    borderColor: '#2e6ddf',
  },
  completedStep: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  stepText: {
    color: '#666',
    fontWeight: 'bold',
  },
  activeStepText: {
    color: 'white',
  },
  connector: {
    width: 30,
    height: 2,
    backgroundColor: '#ddd',
  },
  activeConnector: {
    backgroundColor: '#4CAF50',
  },
});