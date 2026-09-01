// src/screens/onbording/CaloriesScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type CaloriesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Calories'
>;

const CaloriesScreen = () => {
  const navigation = useNavigation<CaloriesScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [calories, setCalories] = useState(0.00);

  const addCalories = () => setCalories(prev => Math.round((prev + 100) * 100) / 100);
  const subtractCalories = () => setCalories(prev => Math.max(0, Math.round((prev - 100) * 100) / 100));

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    disabledBtn: isDarkMode ? '#1E293B' : '#E2E8F0',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Medication')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What's your daily{'\n'}calorie intake?
        </Text>

        <View style={styles.calorieContainer}>
          <Text style={[styles.calorieLabel, { color: colors.textSecondary }]}>
            Daily intake (kcal)
          </Text>

          <View style={styles.stepperContainer}>
            <TouchableOpacity onPress={subtractCalories}>
              <Text style={[styles.stepperText, { color: colors.accent }]}>−</Text>
            </TouchableOpacity>

            <Text style={[styles.calorieValue, { color: colors.textPrimary }]}>
              {calories.toFixed(2)}
            </Text>

            <TouchableOpacity onPress={addCalories}>
              <Text style={[styles.stepperText, { color: colors.accent }]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.calorieText, { color: colors.textPrimary }]}>
          I consume around {calories.toFixed(2)} kcal
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('Medication')}>
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.idkButton, { borderColor: colors.accent }]}>
          <Text style={[styles.idkText, { color: colors.accent }]}>I don't know ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  backButton: { padding: 8 },
  backButtonText: { fontSize: 24, fontWeight: '300' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  themeToggle: { padding: 8 },
  themeToggleText: { fontSize: 22 },
  skipText: { fontSize: 16, fontWeight: '600' },
  content: { flex: 1, justifyContent: 'center', paddingTop: 30 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30, lineHeight: 34 },
  calorieContainer: { alignItems: 'center', marginBottom: 30 },
  calorieLabel: { fontSize: 16, fontWeight: '500', marginBottom: 20, color: '#8A94A6' },
  stepperContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' },
  stepperText: { fontSize: 40, fontWeight: '400', marginHorizontal: 30 },
  calorieValue: { fontSize: 60, fontWeight: '800', color: '#FFFFFF' },
  calorieText: { fontSize: 16, textAlign: 'center' },
  footer: { paddingBottom: 30, gap: 12 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  idkButton: { borderRadius: 30, borderWidth: 1, paddingVertical: 16, alignItems: 'center' },
  idkText: { fontSize: 16, fontWeight: '500' },
});

export default CaloriesScreen;