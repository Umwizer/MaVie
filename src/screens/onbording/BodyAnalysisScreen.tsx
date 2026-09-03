// src/screens/onbording/BodyAnalysisScreen.tsx

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

type BodyAnalysisScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BodyAnalysis'
>;

const BodyAnalysisScreen = () => {
  const navigation = useNavigation<BodyAnalysisScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    illustrationBg: isDarkMode ? '#1E293B' : '#F5F6FA',
  };

  const checklist = [
    'Brightly lit room and environment',
    'Hi-resolution camera capture',
    'Clear body pose & anatomy',
  ];

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
          <TouchableOpacity onPress={() => navigation.navigate('BodyScan')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Body Analysis
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Now we'll scan your body for better{'\n'}assessment. Please ensure the following:
        </Text>

        <View style={[styles.illustrationContainer, { backgroundColor: colors.illustrationBg }]}>
          <Text style={styles.illustrationEmoji}>💃✨</Text>
        </View>

        <View style={styles.checklistContainer}>
          {checklist.map((item, index) => (
            <View key={index} style={styles.checklistItem}>
              <View style={[styles.checkIcon, { backgroundColor: colors.accent }]}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={[styles.checklistText, { color: colors.textPrimary }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('BodyScan')}
        >
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
  content: { flex: 1, paddingTop: 10, justifyContent: 'flex-start' },
  title: { fontSize: 30, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  illustrationContainer: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationEmoji: { fontSize: 80 },
  checklistContainer: {
    gap: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checklistText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: { paddingBottom: 30 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default BodyAnalysisScreen;