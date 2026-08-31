import React from 'react';
import { View, Text } from 'react-native';

export interface Step {
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <View className="px-6 pt-4">
      <View className="flex-row items-center">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <View
              className={`w-5 h-5 rounded-full items-center justify-center ${
                i < currentStep
                  ? 'bg-blue-500'
                  : i === currentStep
                  ? 'border-2 border-blue-500 bg-transparent'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {i === currentStep && <View className="w-2 h-2 rounded-full bg-blue-500" />}
            </View>
            {i < steps.length - 1 && (
              <View
                className={`flex-1 h-0.5 ${
                  i < currentStep ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </View>
      <View className="flex-row justify-between mt-1">
        {steps.map((step, i) => (
          <Text
            key={i}
            className={`flex-1 text-center text-xs font-medium ${
              i === currentStep
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {step.label}
          </Text>
        ))}
      </View>
    </View>
  );
}