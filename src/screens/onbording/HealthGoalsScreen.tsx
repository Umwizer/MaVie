// src/screens/onbording/HealthGoalsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type HealthGoalsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HealthGoals'
>;

const HealthGoalsScreen = () => {
  const navigation = useNavigation<HealthGoalsScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    textLight: isDarkMode ? '#666666' : '#B0B0B0',
    skipText: '#4A6FFF',
    lineColor: isDarkMode ? '#333333' : '#E0E0E0',
    cardBg: isDarkMode ? '#1E1E1E' : '#F5F6FA',
    cardBorder: isDarkMode ? '#333333' : '#E0E0E0',
    cardSelected: '#4A6FFF',
    cardSelectedBg: isDarkMode ? '#1A2A4A' : '#E8EDFF',
    buttonBg: '#4A6FFF',
    buttonDisabled: isDarkMode ? '#333333' : '#F0F0F0',
    buttonTextDisabled: isDarkMode ? '#666666' : '#B0B0B0',
    checkmark: '#4A6FFF',
  };

  const healthGoals = [
    { id: '1', label: 'Improve my overall health', icon: '💪' },
    { id: '2', label: 'Track my health metrics', icon: '📊' },
    { id: '3', label: 'Manage my meds', icon: '💊' },
    { id: '4', label: 'I wanna try wellness AI assistant', icon: '🤖' },
    { id: '5', label: 'I want to analyze activity', icon: '📈' },
    { id: '6', label: 'Just wanna try the app', icon: '👋' },
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      console.log('Selected goal:', selectedGoal);
      // ✅ FIXED NAVIGATION: Goes to BirthDate
      navigation.navigate('BirthDate');
    }
  };

  const handleSelectGoal = (goalId: string) => {
    if (selectedGoal === goalId) {
      setSelectedGoal(null);
    } else {
      setSelectedGoal(goalId);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={statusBarStyle} />

      {/* Back Icon and Skip Button with Horizontal Line */}
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        
        <View style={[styles.horizontalLine, { backgroundColor: colors.lineColor }]} />
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('BirthDate')}
        >
          <Text style={[styles.skipButtonText, { color: colors.skipText }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleDarkMode}>
          <Text style={styles.themeToggleText}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What is your health{'\n'}
          goal for the app?
        </Text>

        <View style={styles.optionsContainer}>
          {healthGoals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.optionCard,
                  { 
                    backgroundColor: isSelected ? colors.cardSelectedBg : colors.cardBg,
                    borderColor: isSelected ? colors.cardSelected : colors.cardBorder,
                  },
                ]}
                onPress={() => handleSelectGoal(goal.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionIcon}>{goal.icon}</Text>
                  <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>
                    {goal.label}
                  </Text>
                </View>
                {isSelected && (
                  <View style={[styles.checkmarkCircle, { backgroundColor: colors.checkmark }]}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton, 
            { backgroundColor: selectedGoal ? colors.buttonBg : colors.buttonDisabled }
          ]}
          onPress={handleContinue}
          disabled={!selectedGoal}
        >
          <Text style={[
            styles.continueButtonText,
            { color: selectedGoal ? '#FFFFFF' : colors.buttonTextDisabled }
          ]}>
            Continue →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 8,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    marginHorizontal: 12,
  },
  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeToggleContainer: {
    alignItems: 'flex-end',
    paddingVertical: 4,
  },
  themeToggle: {
    padding: 8,
  },
  themeToggleText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 24,
    marginTop: 10,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4A6FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default HealthGoalsScreen;