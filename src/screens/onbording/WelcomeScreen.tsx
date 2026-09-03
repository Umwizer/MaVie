// src/screens/onbording/WelcomeScreen.tsx

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

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#050A14' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    lineColor: isDarkMode ? '#1F2937' : '#E0E0E0',
  };

  const handleReady = () => {
    navigation.navigate('OnboardingReady');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    navigation.navigate('signUp');
  };

  const handleHelp = () => {
    console.log('Help pressed!');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={statusBarStyle} />

      {/* Top Progress Bar */}
      <View style={styles.progressContainer}>
        {/* The horizontal line behind the circles */}
        <View style={[styles.progressLine, { backgroundColor: colors.lineColor }]} />
        
        {/* Assessment (Active) */}
        <View style={styles.progressItem}>
          <View style={[styles.circle, { borderColor: colors.accent, backgroundColor: colors.background }]}>
            <View style={[styles.circleDot, { backgroundColor: colors.accent }]} />
          </View>
          <Text style={[styles.label, { color: colors.textPrimary }]}>Assessment</Text>
        </View>
        {/* Personal Info (Inactive) */}
        <View style={styles.progressItem}>
          <View style={[styles.circle, { borderColor: colors.lineColor, backgroundColor: colors.background }]} />
          <Text style={[styles.label, { color: colors.textSecondary }]}>Personal Info</Text>
        </View>
        {/* Choose Plan (Inactive) */}
        <View style={styles.progressItem}>
          <View style={[styles.circle, { borderColor: colors.lineColor, backgroundColor: colors.background }]} />
          <Text style={[styles.label, { color: colors.textSecondary }]}>Choose Plan</Text>
        </View>
      </View>

      {/* Dark Mode Toggle BELOW the Progress Bar */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
          <Text style={styles.themeToggleText}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Big Plus Icon */}
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: colors.accent }]}>+</Text>
        </View>

        {/* Title with ONLY MaVie in Blue */}
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Welcome to{'\n'}<Text style={{ color: colors.accent }}>MaVie</Text>
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your all-in-one health companion
        </Text>

        {/* Login and SignUp Buttons */}
        <TouchableOpacity
          style={[styles.readyButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.readyButtonText}>Sign In  →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.readyButton, { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.accent }]}
          onPress={() => navigation.navigate('signUp')}
          activeOpacity={0.8}
        >
          <Text style={[styles.readyButtonText, { color: colors.accent }]}>Create Account  →</Text>
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: 8,
    left: '10%',
    right: '10%',
    height: 2,
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
  },
  toggleContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
    marginBottom: 20,
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
    paddingBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
  },
  readyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 30,
    backgroundColor: '#4A6FFF',
    paddingVertical: 16,
    shadowColor: '#4A6FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    gap: 10,
  },
  readyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  helpButton: {
    marginTop: 20,
    padding: 10,
  },
  helpText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;