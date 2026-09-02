// src/screens/onbording/MedicationListScreen.tsx

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

type MedicationListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MedicationList'
>;

const MedicationListScreen = () => {
  const navigation = useNavigation<MedicationListScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);

  // More medications added
  const medications = [
    'Aspirin', 'Amoxicillin', 'Atorvastatin', 'Albuterol', 'Acetaminophen', 
    'Amitriptyline', 'Ibuprofen', 'Metformin', 'Lisinopril', 'Omeprazole',
    'Losartan', 'Gabapentin', 'Hydrochlorothiazide', 'Sertraline', 'Simvastatin',
    'Azithromycin', 'Ciprofloxacin', 'Doxycycline', 'Fluoxetine', 'Furosemide',
    'Insulin', 'Levothyroxine', 'Melatonin', 'Naproxen', 'Pantoprazole',
    'Prednisone', 'Ranitidine', 'Tramadol', 'Vitamin D', 'Zoloft'
  ];

  const filteredMedications = medications.filter(med => med.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleMedication = (med: string) => {
    if (selectedMedications.includes(med)) {
      setSelectedMedications(selectedMedications.filter(item => item !== med));
    } else {
      setSelectedMedications([...selectedMedications, med]);
    }
  };

  // If user searches something that isn't there, go to Not Found screen
  const handleSearchSubmit = () => {
    if (filteredMedications.length === 0 && searchQuery.length > 0) {
      navigation.navigate('MedicationNotFound', { searchedMedication: searchQuery });
    }
  };

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    inputBg: isDarkMode ? '#1E293B' : '#F5F6FA',
    inputBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    listBg: isDarkMode ? '#111827' : '#FFFFFF',
    pillBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('Allergy')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentHeader}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Please specify your{'\n'}medications, then.
        </Text>

        <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search medication..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={handleSearchSubmit} style={{ padding: 8 }}>
            <Text style={{ color: colors.accent, fontWeight: '700', fontSize: 16 }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        <View style={[styles.list, { backgroundColor: colors.listBg, borderColor: colors.inputBorder }]}>
          {filteredMedications.map((med) => {
            const isSelected = selectedMedications.includes(med);
            return (
              <TouchableOpacity
                key={med}
                style={styles.listItem}
                onPress={() => toggleMedication(med)}
              >
                <Text style={[styles.medText, { color: colors.textPrimary }]}>{med}</Text>
                <View style={[
                  styles.checkbox,
                  { 
                    borderColor: isSelected ? colors.accent : colors.textSecondary,
                    backgroundColor: isSelected ? colors.accent : 'transparent'
                  }
                ]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={[styles.selectedLabel, { color: colors.textSecondary }]}>Selected:</Text>
        <View style={styles.selectedPillsContainer}>
          {selectedMedications.map(med => (
            <TouchableOpacity 
              key={med} 
              style={[styles.pill, { backgroundColor: colors.pillBg }]}
              onPress={() => toggleMedication(med)}
            >
              <Text style={[styles.pillText, { color: colors.accent }]}>{med}</Text>
              <Text style={[styles.pillClose, { color: colors.accent }]}> ×</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('Allergy')} // <-- UPDATED TO ALLERGY
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
  contentHeader: { paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 20, lineHeight: 34 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, marginBottom: 20 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  listContainer: { flex: 1 },
  list: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(128, 128, 128, 0.2)' },
  medText: { fontSize: 16, fontWeight: '500' },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  footer: { paddingTop: 20, paddingBottom: 30 },
  selectedLabel: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
  selectedPillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  pillText: { fontSize: 14, fontWeight: '600' },
  pillClose: { fontSize: 16, fontWeight: '700', marginLeft: 4 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default MedicationListScreen;