// src/screens/onbording/MedicationScreen.tsx

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

type MedicationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Medication'
>;

const MedicationScreen = () => {
  const navigation = useNavigation<MedicationScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('NextScreen')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Are you currently taking{'\n'}any medications?
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We are asking this to get accurate result.
        </Text>

        {/* Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Text style={styles.illustrationEmoji}>💊</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* YES: Go to Medication List */}
        <TouchableOpacity 
          style={[styles.yesButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('MedicationList')}
        >
          <Text style={styles.yesButtonText}>Yes, I take it  →</Text>
        </TouchableOpacity>

        {/* NO: Skip to Next Screen */}
        <TouchableOpacity 
          style={[styles.noButton, { borderColor: colors.accent }]}
          onPress={() => navigation.navigate('NextScreen')}
        >
          <Text style={[styles.noButtonText, { color: colors.accent }]}>Nope, I don't take it</Text>
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
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 12, lineHeight: 34 },
  subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 40 },
  illustrationContainer: { alignItems: 'center', marginBottom: 40 },
  illustrationCircle: { width: 160, height: 160, borderRadius: 90, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center' },
  illustrationEmoji: { fontSize: 80 },
  footer: { paddingBottom: 30, gap: 12 },
  yesButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  yesButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  noButton: { borderRadius: 30, borderWidth: 1, paddingVertical: 16, alignItems: 'center' },
  noButtonText: { fontSize: 16, fontWeight: '500' },
});

export default MedicationScreen;