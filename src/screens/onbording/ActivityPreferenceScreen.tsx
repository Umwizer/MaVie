// src/screens/onbording/ActivityPreferenceScreen.tsx

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

type ActivityPreferenceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ActivityPreference'
>;

const ActivityPreferenceScreen = () => {
  const navigation = useNavigation<ActivityPreferenceScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [selected, setSelected] = useState('Jogging');

  const activities = [
    { icon: '🏃', label: 'Jogging' },
    { icon: '🏊', label: 'Swimming' },
    { icon: '⛸️', label: 'Skating' },
    { icon: '🚶', label: 'Walking' },
    { icon: '🚴', label: 'Cycling' },
    { icon: '🏋️', label: 'Other' },
  ];

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    cardBg: isDarkMode ? '#111827' : '#F5F6FA',
    cardBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    cardSelectedBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('Mood')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What type of activity/{'\n'}exercise do you prefer?
        </Text>

        <View style={styles.optionsContainer}>
          {activities.map((activity) => {
            const isSelected = selected === activity.label;
            return (
              <TouchableOpacity
                key={activity.label}
                style={[
                  styles.optionCard,
                  {
                    backgroundColor: isSelected ? colors.cardSelectedBg : colors.cardBg,
                    borderColor: isSelected ? colors.accent : colors.cardBorder,
                  },
                ]}
                onPress={() => setSelected(activity.label)}
              >
                <View style={styles.optionLeft}>
                  <Text style={styles.optionIcon}>{activity.icon}</Text>
                  <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>{activity.label}</Text>
                </View>
                <View style={[styles.radioCircle, { borderColor: isSelected ? colors.accent : colors.textSecondary }]}>
                  {isSelected && <View style={[styles.radioDot, { backgroundColor: colors.accent }]} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('Mood')}>
          <Text style={styles.continueButtonText}>Continue →</Text>
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
  content: { flex: 1, paddingTop: 30 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 30 },
  optionsContainer: { gap: 12 },
  optionCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 12, borderWidth: 2 },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionIcon: { fontSize: 20, marginRight: 12 },
  optionLabel: { fontSize: 16, fontWeight: '500' },
  radioCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  radioDot: { width: 12, height: 12, borderRadius: 6 },
  footer: { paddingBottom: 30, paddingTop: 20 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default ActivityPreferenceScreen;