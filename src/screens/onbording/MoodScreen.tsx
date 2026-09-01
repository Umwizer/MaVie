// src/screens/onbording/MoodScreen.tsx

import React, { useState, useRef } from 'react';
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

type MoodScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Mood'
>;

const { width } = Dimensions.get('window');
const SIDE_ITEM_WIDTH = 60;

const MoodScreen = () => {
  const navigation = useNavigation<MoodScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  // 🌟 12 unique moods for unlimited choice!
  const moods = [
    { emoji: '😞', label: "I'm feeling sad" },
    { emoji: '😐', label: "I'm feeling neutral" },
    { emoji: '😊', label: "I'm feeling very happy" },
    { emoji: '😡', label: "I'm feeling angry" },
    { emoji: '😴', label: "I'm feeling tired" },
    { emoji: '🤩', label: "I'm feeling excited" },
    { emoji: '😰', label: "I'm feeling anxious" },
    { emoji: '🥰', label: "I'm feeling loved" },
    { emoji: '🤒', label: "I'm feeling sick" },
    { emoji: '🤯', label: "I'm feeling stressed" },
    { emoji: '😎', label: "I'm feeling cool" },
    { emoji: '🙏', label: "I'm feeling grateful" },
  ];

  const [selectedMood, setSelectedMood] = useState(2); // Default to Happy
  const scrollRef = useRef<ScrollView>(null);

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#10B981',
    tabBg: isDarkMode ? '#1E293B' : '#F0F0F0',
  };

  const handleSelect = (index: number) => {
    setSelectedMood(index);
    // Scroll the item to the center so the user sees it!
    scrollRef.current?.scrollTo({ x: index * SIDE_ITEM_WIDTH, animated: true });
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
          <TouchableOpacity onPress={() => navigation.navigate('Diet')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What's your current{'\n'}mood right now?
        </Text>

        {/* Horizontal Scrollable Mood Picker */}
        <View style={styles.moodContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SIDE_ITEM_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: (width - SIDE_ITEM_WIDTH) / 2 }}
          >
            {moods.map((mood, index) => {
              const isSelected = selectedMood === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.emojiItem, 
                    { width: SIDE_ITEM_WIDTH }
                  ]}
                  onPress={() => handleSelect(index)}
                >
                  {/* The Center Big Emoji */}
                  {isSelected ? (
                    <View style={[styles.mainMood, { backgroundColor: colors.accent }]}>
                      <Text style={styles.mainEmoji}>{mood.emoji}</Text>
                    </View>
                  ) : (
                    // The Side Smaller Emojis
                    <View style={[styles.sideMood, { backgroundColor: colors.tabBg }]}>
                      <Text style={styles.sideEmoji}>{mood.emoji}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Green Glowing Selection Indicator (Top only) */}
          <View style={styles.selectionPointer} />
        </View>

        <Text style={[styles.moodLabel, { color: colors.textPrimary }]}>
          {moods[selectedMood].label}
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Diet')}>
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
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 40, lineHeight: 34 },
  moodContainer: { height: 160, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emojiItem: { height: 160, justifyContent: 'center', alignItems: 'center' },
  mainMood: { width: 110, height: 110, borderRadius: 55, justifyContent: 'center', alignItems: 'center', shadowColor: '#10B981', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8 },
  mainEmoji: { fontSize: 60 },
  sideMood: { width: 55, height: 55, borderRadius: 27.5, justifyContent: 'center', alignItems: 'center', opacity: 0.7 },
  sideEmoji: { fontSize: 28 },
  selectionPointer: { position: 'absolute', top: 10, width: 0, height: 0, borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#10B981', left: '50%', marginLeft: -8 },
  moodLabel: { fontSize: 18, fontWeight: '500', textAlign: 'center' },
  footer: { paddingBottom: 30 },
  continueButton: { backgroundColor: '#3B82F6', borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default MoodScreen;