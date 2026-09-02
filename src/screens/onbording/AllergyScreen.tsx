// src/screens/onbording/AllergyScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type AllergyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Allergy'
>;

const AllergyScreen = () => {
  const navigation = useNavigation<AllergyScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [inputText, setInputText] = useState('');
  const [allergies, setAllergies] = useState<string[]>(['Nuts', 'Bread', 'Cheese', 'Polle']);

  const addAllergy = () => {
    const trimmed = inputText.trim();
    if (trimmed.length > 0) {
      setAllergies([...allergies, trimmed]);
      setInputText('');
    }
  };

  const removeAllergy = (index: number) => {
    const newAllergies = [...allergies];
    newAllergies.splice(index, 1);
    setAllergies(newAllergies);
  };

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    inputBg: isDarkMode ? '#0F172A' : '#F5F6FA',
    inputBorder: isDarkMode ? '#1E3A8A' : '#E0E0E0',
    pillBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('MedicalConditions')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Do you have any{'\n'}ongoing allergy?
        </Text>

        {/* Bacteria Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationEmoji}>🦠 🦠 🦠</Text>
          <Text style={styles.illustrationEmojiSmall}>🌿 🟡 🦠</Text>
        </View>

        {/* Tag Input */}
        <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
          <ScrollView 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.tagContainer}
          >
            {allergies.map((allergy, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.pill, { backgroundColor: colors.pillBg }]}
                onPress={() => removeAllergy(index)}
              >
                <Text style={[styles.pillText, { color: colors.accent }]}>{allergy}</Text>
                <Text style={[styles.pillClose, { color: colors.accent }]}> ×</Text>
              </TouchableOpacity>
            ))}
            <TextInput
              style={[styles.input, { color: colors.textPrimary }]}
              placeholder="Type allergy..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={addAllergy}
              returnKeyType="done"
              maxLength={10}
            />
          </ScrollView>
          <Text style={[styles.charCount, { color: colors.textSecondary }]}>⌨ {inputText.length}/10</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('MedicalConditions')}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.noButton, { borderColor: colors.accent }]}
          onPress={() => navigation.navigate('MedicalConditions')}
        >
          <Text style={[styles.noButtonText, { color: colors.accent }]}>✕  I don't have any</Text>
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
  content: { flex: 1, paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 20, lineHeight: 34 },
  illustrationContainer: { alignItems: 'center', marginBottom: 30 },
  illustrationEmoji: { fontSize: 40, marginBottom: 5 },
  illustrationEmojiSmall: { fontSize: 24 },
  inputBox: { borderRadius: 16, borderWidth: 1, padding: 12, minHeight: 100 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  pillText: { fontSize: 14, fontWeight: '600' },
  pillClose: { fontSize: 16, fontWeight: '700', marginLeft: 4 },
  input: { fontSize: 16, minWidth: 100, paddingVertical: 8 },
  charCount: { fontSize: 12, alignSelf: 'flex-end', marginTop: 10 },
  footer: { paddingBottom: 30, gap: 12 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  noButton: { borderRadius: 30, borderWidth: 1, paddingVertical: 16, alignItems: 'center' },
  noButtonText: { fontSize: 16, fontWeight: '500' },
});

export default AllergyScreen;