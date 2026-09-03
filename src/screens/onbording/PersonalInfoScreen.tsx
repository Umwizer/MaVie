// src/screens/onbording/PersonalInfoScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalInfo'
>;

const PersonalInfoScreen = () => {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    textLight: isDarkMode ? '#666666' : '#B0B0B0',
    inputBorder: isDarkMode ? '#333333' : '#E0E0E0',
    inputFocus: '#4A6FFF',
    buttonBg: '#4A6FFF',
    buttonDisabled: isDarkMode ? '#333333' : '#F0F0F0',
    buttonTextDisabled: isDarkMode ? '#666666' : '#B0B0B0',
    clearText: isDarkMode ? '#666666' : '#B0B0B0',
    skipText: '#4A6FFF',
    lineColor: isDarkMode ? '#333333' : '#E0E0E0',
    iconBg: isDarkMode ? '#1E1E1E' : '#F5F6FA',
    iconBorder: isDarkMode ? '#333333' : '#E0E0E0',
    errorText: '#FF3B30',
  };

  const handleContinue = () => {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      Alert.alert('Invalid Name', 'Please enter your full legal name (at least 2 characters).');
      return;
    }
    console.log('Name submitted:', trimmedName);
    // Navigate to HealthGoals screen
    navigation.navigate('Gender');
  };

  const isValidName = name.trim().length >= 2;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            onPress={() => navigation.navigate('Gender')}
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

        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              What's your full{'\n'}
              legal name?
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  { 
                    color: colors.textPrimary,
                    borderBottomColor: colors.inputBorder 
                  },
                  isFocused && { borderBottomColor: colors.inputFocus },
                  name.length > 0 && { borderBottomColor: colors.inputFocus },
                  name.length > 0 && name.trim().length < 2 && { borderBottomColor: colors.errorText },
                ]}
                placeholder="Enter your name..."
                placeholderTextColor={colors.textLight}
                value={name}
                onChangeText={setName}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus={true}
              />
              
              {name.length > 0 && (
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={() => setName('')}
                >
                  <Text style={[styles.clearText, { color: colors.clearText }]}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {name.length > 0 && name.trim().length < 2 && (
              <Text style={[styles.errorText, { color: colors.errorText }]}>
                Please enter a valid name (at least 2 characters)
              </Text>
            )}

            {/* Separator Icon */}
            <View style={styles.separatorContainer}>
              <View style={[styles.separatorIcon, { 
                backgroundColor: colors.iconBg,
                borderColor: colors.iconBorder 
              }]}>
                <Text style={styles.separatorIconText}>🔒</Text>
              </View>
            </View>

            <Text style={[styles.helperText, { color: colors.textSecondary }]}>
              For regulatory purposes, please enter{'\n'}
              name stated on your state ID.
            </Text>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[
                styles.continueButton, 
                { backgroundColor: isValidName ? colors.buttonBg : colors.buttonDisabled }
              ]}
              onPress={handleContinue}
              disabled={!isValidName}
            >
              <Text style={[
                styles.continueButtonText,
                { color: isValidName ? '#FFFFFF' : colors.buttonTextDisabled }
              ]}>
                Continue →
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 32,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  input: {
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    top: 12,
    padding: 4,
  },
  clearText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },
  separatorContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  separatorIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  separatorIconText: {
    fontSize: 20,
  },
  helperText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    textAlign: 'center',
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
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PersonalInfoScreen;