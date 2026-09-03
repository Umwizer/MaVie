// src/screens/onbording/CheckupFrequencyScreen.tsx

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

type CheckupFrequencyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CheckupFrequency'
>;

const CheckupFrequencyScreen = () => {
  const navigation = useNavigation<CheckupFrequencyScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [selectedIndex, setSelectedIndex] = useState(2); // Default to "Monthly"

  const options = ['Weekly', 'Bi-weekly', 'Monthly', 'Bi-monthly', 'Yearly'];

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#4A5568' : '#A0AEC0',
    textFaded: isDarkMode ? '#2D3748' : '#E2E8F0',
    accent: '#3B82F6',
    selectedBoxBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
    selectedBoxBorder: '#3B82F6',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BodyAnalysis')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          How often do you do{'\n'}health checkup?
        </Text>
      </View>

      {/* Static Clean List */}
      <View style={styles.listContainer}>
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.itemContainer,
                {
                  backgroundColor: isSelected ? colors.selectedBoxBg : 'transparent',
                  borderColor: isSelected ? colors.selectedBoxBorder : 'transparent',
                },
              ]}
              onPress={() => setSelectedIndex(index)}
            >
              <Text
                style={[
                  styles.itemText,
                  isSelected
                    ? { color: colors.accent, fontSize: 24, fontWeight: '700' }
                    : { color: colors.textFaded, fontSize: 20, fontWeight: '400' },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('BodyAnalysis')}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.noButton, { borderColor: colors.accent }]}
          onPress={() => navigation.navigate('BodyAnalysis')}
        >
          <Text style={[styles.noButtonText, { color: colors.accent }]}>✕  I never do health checkup</Text>
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
  titleContainer: { marginBottom: 10, marginTop: 20 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', lineHeight: 34 },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 2,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    textAlign: 'center',
  },
  footer: { paddingBottom: 40, paddingTop: 20, gap: 12 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  noButton: { borderRadius: 30, borderWidth: 1, paddingVertical: 16, alignItems: 'center' },
  noButtonText: { fontSize: 16, fontWeight: '500' },
});

export default CheckupFrequencyScreen;