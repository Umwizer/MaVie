// src/screens/onbording/AdditionalNotesScreen.tsx

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

type AdditionalNotesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AdditionalNotes'
>;

const AdditionalNotesScreen = () => {
  const navigation = useNavigation<AdditionalNotesScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [note, setNote] = useState('');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    inputBg: isDarkMode ? '#1E293B' : '#F5F6FA',
    inputBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    buttonBg: isDarkMode ? '#1E293B' : '#E0E0E0',
  };

  // ✅ SAVE THE NOTE AND GO TO THE HOME SCREEN
  const handleContinue = async () => {
    await AsyncStorage.setItem('userAdditionalNotes', note);
    navigation.navigate('VoiceAIAnalysis'); // <-- Navigate to VoiceAIAnalysis after saving note
  };

  const handleUndo = () => {
    console.log('Undo clicked');
  };

  const handleRedo = () => {
    console.log('Redo clicked');
  };

  const handleDelete = () => {
    setNote('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={statusBarStyle} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Do you have any{'\n'}additional health note?
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Any medical or health notes will be helpful for{'\n'}Dr. asklepios AI. Feel free to write any.
        </Text>

        {/* Notes Input Box */}
        <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Enter your note..."
            placeholderTextColor={colors.textSecondary}
            multiline
            textAlignVertical="top"
            value={note}
            onChangeText={(text) => setNote(text.slice(0, 100))}
            maxLength={100}
          />

          {/* Bottom Row of the Input */}
          <View style={styles.inputBottomRow}>
            <View style={styles.toolsLeft}>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: colors.buttonBg }]} onPress={handleUndo}>
                <Text style={[styles.toolIcon, { color: colors.textPrimary }]}>↺</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: colors.buttonBg }]} onPress={handleRedo}>
                <Text style={[styles.toolIcon, { color: colors.textPrimary }]}>↻</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.toolButton, { backgroundColor: '#EF4444' }]} onPress={handleDelete}>
                <Text style={[styles.toolIcon, { color: '#FFFFFF' }]}>🗑️</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.charCount, { color: colors.textSecondary }]}>✎ {note.length}/100</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={handleContinue}
        >
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
  content: { flex: 1, paddingTop: 30 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 12, lineHeight: 34 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  inputBox: { borderRadius: 16, borderWidth: 1, padding: 16, height: 200 },
  input: { flex: 1, fontSize: 16, lineHeight: 24 },
  inputBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  toolsLeft: { flexDirection: 'row', gap: 8 },
  toolButton: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  toolIcon: { fontSize: 18, fontWeight: 'bold' },
  charCount: { fontSize: 14, fontWeight: '500' },
  footer: { paddingBottom: 30 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default AdditionalNotesScreen;