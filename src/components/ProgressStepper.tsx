// src/components/ProgressStepper.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProgressStepperProps = {
  steps: string[];
  currentStep: number;
};

const ProgressStepper = ({ steps, currentStep }: ProgressStepperProps) => {
  return (
    <View style={styles.container}>
      {steps.map((step, i) => (
        <View key={i} style={styles.stepWrapper}>
          <View
            style={[
              styles.circle,
              i <= currentStep ? styles.activeCircle : styles.inactiveCircle,
            ]}
          >
            <Text
              style={[
                styles.stepText,
                i <= currentStep ? styles.activeText : styles.inactiveText,
              ]}
            >
              {i + 1}
            </Text>
          </View>
          <Text
            style={[
              styles.label,
              i <= currentStep ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stepWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeCircle: {
    backgroundColor: '#4A6FFF',
  },
  inactiveCircle: {
    backgroundColor: '#E0E0E0',
  },
  stepText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#666666',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#4A6FFF',
  },
  inactiveLabel: {
    color: '#999999',
  },
});

export default ProgressStepper;