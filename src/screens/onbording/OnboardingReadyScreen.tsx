import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type OnboardingReadyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnboardingReady'
>;

const OnboardingReadyScreen = () => {
  const navigation = useNavigation<OnboardingReadyScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    cardBackground: isDarkMode ? '#1E1E1E' : '#F0F4FF',
    skipText: '#4A6FFF',
    lineColor: isDarkMode ? '#333333' : '#E0E0E0',
    buttonBg: '#4A6FFF',
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
          onPress={() => navigation.navigate('PersonalInfo')}
        >
          <Text style={[styles.skipButtonText, { color: colors.skipText }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Mode Toggle - Separated from Skip */}
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleDarkMode}>
          <Text style={styles.themeToggleText}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: colors.cardBackground }]}>
          <Text style={styles.iconEmoji}>📋</Text>
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Let's get to know you{'\n'}
          better
        </Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We'll need some information to{'\n'}
          set up your account properly.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.buttonBg }]}
          onPress={() => navigation.navigate('PersonalInfo')}
        >
          <Text style={styles.continueButtonText}>Get Started →</Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  iconEmoji: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
  },
  footer: {
    paddingBottom: 40,
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
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingReadyScreen;