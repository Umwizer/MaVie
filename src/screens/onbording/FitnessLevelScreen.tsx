import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type FitnessLevelScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FitnessLevel'
>;

const { width } = Dimensions.get('window');
const KNOB_SIZE = 40;
const TRACK_WIDTH = width - 48;

const FitnessLevelScreen = () => {
  const navigation = useNavigation<FitnessLevelScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const levels = [
    { id: 1, label: 'Beginner', desc: 'I exercise 1-2 times monthly' },
    { id: 2, label: 'Novice', desc: 'I exercise 1-2 times weekly' },
    { id: 3, label: 'Intermediate', desc: 'I exercise 3-4 times weekly' },
    { id: 4, label: 'Athletic', desc: 'I exercise 3-4 times weekly' },
    { id: 5, label: 'Elite', desc: 'I exercise 5-6 times weekly' },
  ];

  const [selectedLevel, setSelectedLevel] = useState(4);

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (KNOB_SIZE * 1.5));
    setSelectedLevel(index + 1);
  };

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#10B981',
    trackBg: isDarkMode ? '#1E293B' : '#E2E8F0',
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
          <TouchableOpacity onPress={() => navigation.navigate('SleepLevel')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          How would you rate{'\n'}your fitness level?
        </Text>

        <Text style={[styles.levelLabel, { color: colors.accent }]}>LEVEL {selectedLevel}</Text>

        <View style={styles.sliderContainer}>
          <View style={[styles.track, { backgroundColor: colors.trackBg }]} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={KNOB_SIZE * 1.5}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: (TRACK_WIDTH - KNOB_SIZE) / 2 }}
            onMomentumScrollEnd={onScrollEnd}
          >
            {levels.map((level, index) => (
              <View key={level.id} style={[styles.knotContainer, { width: KNOB_SIZE * 1.5 }]}>
                {index === selectedLevel - 1 && (
                  <View style={[styles.knob, { backgroundColor: colors.accent }]}>
                    <View style={styles.knobInner} />
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={[styles.selectedTitle, { color: colors.textPrimary }]}>
          {levels[selectedLevel - 1].label}
        </Text>
        <Text style={[styles.selectedDesc, { color: colors.textSecondary }]}>
          {levels[selectedLevel - 1].desc}
        </Text>
        <Text style={[styles.dragHint, { color: colors.textSecondary }]}>
          ⓘ  Drag the slider to adjust
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, { backgroundColor: '#3B82F6' }]} onPress={() => navigation.navigate('SleepLevel')}>
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
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30, lineHeight: 34 },
  levelLabel: { fontSize: 14, fontWeight: '800', letterSpacing: 1, marginBottom: 20 },
  sliderContainer: { height: 80, width: '100%', justifyContent: 'center', marginBottom: 30 },
  track: { position: 'absolute', left: 0, right: 0, height: 12, borderRadius: 6, opacity: 0.5 },
  knotContainer: { height: 80, justifyContent: 'center', alignItems: 'center' },
  knob: { width: KNOB_SIZE, height: KNOB_SIZE, borderRadius: KNOB_SIZE / 2, justifyContent: 'center', alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  knobInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' },
  selectedTitle: { fontSize: 32, fontWeight: '900', marginBottom: 10 },
  selectedDesc: { fontSize: 16, textAlign: 'center', marginBottom: 15, lineHeight: 22 },
  dragHint: { fontSize: 12, fontWeight: '500' },
  footer: { paddingBottom: 30 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default FitnessLevelScreen;