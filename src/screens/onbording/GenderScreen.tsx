// src/screens/onbording/GenderScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type GenderScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Gender'
>;

const GenderScreen = () => {
  const navigation = useNavigation<GenderScreenNavigationProp>();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    accent: '#4A6FFF',
    cardBg: isDarkMode ? '#111827' : '#F5F6FA',
    cardBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    cardSelectedBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
    inputBg: isDarkMode ? '#1E293B' : '#FFFFFF',
  };

  // TEMPORARY: Navigating to "Welcome" to prevent crash. Change to 'ChoosePlan' later
  const handleNext = () => navigation.navigate('Welcome'); 

  const GenderOption = ({ label, icon, value }: { label: string, icon: string, value: string }) => {
    const isSelected = selectedGender === value;
    return (
      <TouchableOpacity
        style={[
          styles.optionCard,
          {
            backgroundColor: isSelected ? colors.cardSelectedBg : colors.cardBg,
            borderColor: isSelected ? colors.accent : colors.cardBorder,
          },
        ]}
        onPress={() => setSelectedGender(value)}
      >
        <View style={styles.optionLeft}>
          <Text style={styles.optionIcon}>{icon}</Text>
          <Text style={[styles.optionLabel, { color: colors.textPrimary }]}>{label}</Text>
        </View>
        <View style={[styles.radioCircle, { borderColor: isSelected ? colors.accent : colors.textSecondary }]}>
          {isSelected && <View style={[styles.radioDot, { backgroundColor: colors.accent }]} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={statusBarStyle} />

      {/* Header with Back and Dark Mode Toggle */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What is your gender?
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          For the purpose of regulation, please specify your gender truthfully.
        </Text>

        <View style={styles.optionsContainer}>
          <GenderOption label="I am Male" icon="♂️" value="Male" />
          <GenderOption label="I am Female" icon="♀️" value="Female" />
          
          <GenderOption label="I am Other" icon="⚧️" value="Other" />
          
          {selectedGender === 'Other' && (
            <View style={[styles.otherInputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
              <TextInput
                style={[styles.otherInput, { color: colors.textPrimary }]}
                placeholder="Describe your gender (e.g., Non-binary...)"
                placeholderTextColor={colors.textSecondary}
                multiline
                value={customText}
                onChangeText={setCustomText}
                maxLength={30}
              />
              <Text style={[styles.charCount, { color: colors.textSecondary }]}>{customText.length}/30</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: selectedGender ? colors.accent : colors.cardBg }
          ]}
          disabled={!selectedGender}
          onPress={handleNext}
        >
          <Text style={[styles.continueButtonText, { color: selectedGender ? '#FFFFFF' : colors.textSecondary }]}>
            Continue →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.preferNotToSay}
          onPress={handleNext}
        >
          <Text style={[styles.preferNotToSayText, { color: colors.textPrimary }]}>✕  Prefer not to say</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    padding: 8,
    marginRight: 8,
  },
  themeToggleText: {
    fontSize: 24,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 24,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  otherInputBox: {
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  otherInput: {
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  footer: {
    paddingBottom: 30,
    paddingTop: 10,
    gap: 12,
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  preferNotToSay: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  preferNotToSayText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GenderScreen;