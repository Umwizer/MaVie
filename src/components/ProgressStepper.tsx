import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '../constants/theme'; // adjust path

export interface Step {
  label: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View style={styles.container}>
      {/* Dots + Lines */}
      <View style={styles.row}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <View
              style={[
                styles.dot,
                i < currentStep && styles.dotCompleted,
                i === currentStep && styles.dotActive,
                i > currentStep && (isDark ? styles.dotInactiveDark : styles.dotInactiveLight)
              ]}
            >
              {i === currentStep && <View style={styles.innerDot} />}
            </View>
            
            {i < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  i < currentStep ? styles.lineCompleted : (isDark ? styles.lineInactiveDark : styles.lineInactiveLight)
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Labels */}
      <View style={styles.labelRow}>
        {steps.map((step, i) => (
          <Text
            key={i}
            style={[
              styles.label,
              i === currentStep 
                ? (isDark ? styles.labelActiveDark : styles.labelActiveLight)
                : (isDark ? styles.labelInactiveDark : styles.labelInactiveLight)
            ]}
          >
            {step.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const DOT_SIZE = 20;
const INNER_DOT_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCompleted: {
    backgroundColor: colors.primary, // blue-500
  },
  dotActive: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  dotInactiveLight: {
    backgroundColor: '#E5E7EB', // gray-200
  },
  dotInactiveDark: {
    backgroundColor: '#374151', // gray-700
  },
  innerDot: {
    width: INNER_DOT_SIZE,
    height: INNER_DOT_SIZE,
    borderRadius: INNER_DOT_SIZE / 2,
    backgroundColor: colors.primary,
  },
  line: {
    flex: 1,
    height: 2,
  },
  lineCompleted: {
    backgroundColor: colors.primary,
  },
  lineInactiveLight: {
    backgroundColor: '#E5E7EB', // gray-200
  },
  lineInactiveDark: {
    backgroundColor: '#374151', // gray-700
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  labelActiveLight: {
    color: '#111827', // gray-900
  },
  labelActiveDark: {
    color: '#FFFFFF',
  },
  labelInactiveLight: {
    color: '#9CA3AF', // gray-400
  },
  labelInactiveDark: {
    color: '#6B7280', // gray-500
  },
});