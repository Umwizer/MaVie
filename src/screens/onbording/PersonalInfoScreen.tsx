// src/screens/onbording/PersonalInfoScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from '../../navigation/types';

type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PersonalInfo'
>;

const PersonalInfoScreen = () => {
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [fullName, setFullName] = useState('');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    inputBg: isDarkMode ? '#1E293B' : '#F5F6FA',
    inputBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    cardBg: isDarkMode ? '#1E293B' : '#F5F6FA', // <-- ADDED THIS LINE
  };

  const handleContinue = async () => {
    if (fullName.trim()) {
      // SAVE THE NAME TO THE PHONE
      await AsyncStorage.setItem('userName', fullName.trim());
      navigation.navigate('HealthGoals');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={statusBarStyle} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HealthGoals')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What's your full{'\n'}legal name?
        </Text>

        <View style={[styles.inputBox, { borderColor: colors.inputBorder }]}>
          <TextInput
            style={[styles.input, { color: colors.textPrimary, backgroundColor: colors.inputBg }]}
            placeholder="Enter your name..."
            placeholderTextColor={colors.textSecondary}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: fullName.trim() ? colors.accent : colors.cardBg }]}
          disabled={!fullName.trim()}
          onPress={handleContinue}
        >
          <Text style={[styles.continueButtonText, { color: fullName.trim() ? '#FFFFFF' : colors.textSecondary }]}>
            Continue →
          </Text>
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
  skipText: { fontSize: 16, fontWeight: '500' },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20 },
  inputBox: { borderBottomWidth: 1 },
  input: { fontSize: 18, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 12 },
  footer: { paddingBottom: 30, gap: 12 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { fontSize: 18, fontWeight: '600' },
});

export default PersonalInfoScreen;