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

type SleepLevelScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SleepLevel'
>;

const SleepLevelScreen = () => {
  const navigation = useNavigation<SleepLevelScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [level, setLevel] = useState(5);

  const sleepLabels = [
    { level: 1, desc: 'I sleep 2-3 hours daily' },
    { level: 2, desc: 'I sleep 3-4 hours daily' },
    { level: 3, desc: 'I sleep 4-5 hours daily' },
    { level: 4, desc: 'I sleep 5-6 hours daily' },
    { level: 5, desc: 'I sleep 6-7 hours daily' },
  ];

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    tabBg: isDarkMode ? '#1E293B' : '#F0F0F0',
    tabActiveBg: isDarkMode ? '#334155' : '#FFFFFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('ActivityPreference')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          How would you rate{'\n'}your sleep level?
        </Text>

        <View style={styles.bigNumberContainer}>
          <Text style={[styles.bigNumber, { color: colors.textPrimary }]}>{level}</Text>
        </View>

        <Text style={[styles.levelLabel, { color: colors.textSecondary }]}>
          {level === 5 ? 'Moderate' : sleepLabels[level - 1].desc.split(' ').slice(0, 2).join(' ')}
        </Text>

        <View style={[styles.sliderContainer, { backgroundColor: colors.tabBg }]}>
          {sleepLabels.map((item) => (
            <TouchableOpacity 
              key={item.level}
              style={[styles.sliderItem, { backgroundColor: level === item.level ? colors.tabActiveBg : 'transparent' }]}
              onPress={() => setLevel(item.level)}
            >
              <Text style={[styles.sliderText, { color: level === item.level ? colors.textPrimary : colors.textSecondary }]}>
                {item.level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>
            {sleepLabels[level - 1].desc}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('ActivityPreference')}>
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
  content: { flex: 1, justifyContent: 'center', paddingTop: 30 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30, lineHeight: 34 },
  bigNumberContainer: { alignItems: 'center', marginBottom: 10 },
  bigNumber: { fontSize: 90, fontWeight: '900' },
  levelLabel: { fontSize: 24, fontWeight: '500', textAlign: 'center', marginBottom: 30 },
  sliderContainer: { flexDirection: 'row', justifyContent: 'space-between', borderRadius: 12, padding: 4, marginBottom: 20 },
  sliderItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  sliderText: { fontSize: 18, fontWeight: '600' },
  descriptionContainer: { alignItems: 'center' },
  descriptionText: { fontSize: 14 },
  footer: { paddingBottom: 30, paddingTop: 20 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default SleepLevelScreen;