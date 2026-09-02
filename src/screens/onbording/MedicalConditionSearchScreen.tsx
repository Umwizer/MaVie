// src/screens/onbording/MedicalConditionSearchScreen.tsx

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

type MedicalConditionSearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MedicalConditionSearch'
>;

const MedicalConditionSearchScreen = () => {
  const navigation = useNavigation<MedicalConditionSearchScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const conditions = [
    'Asthma',
    'Arthritis',
    'Anemia',
    'Anxiety Disorders',
    'Acne',
    'Acid Reflux',
    'Chronic Pain',
    'Diabetes',
    'Hypertension',
    'Migraine',
  ];

  const filteredConditions = conditions.filter(cond => 
    cond.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(item => item !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
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

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Browse Medical Condition</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MedicalConditionList')}>
          <Text style={[styles.closeIcon, { color: colors.textPrimary }]}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Search medical condition..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredConditions.map((condition) => {
          const isSelected = selectedConditions.includes(condition);
          return (
            <TouchableOpacity
              key={condition}
              style={[
                styles.listItem,
                {
                  backgroundColor: isSelected ? colors.accent : 'transparent',
                  borderColor: isSelected ? colors.accent : 'transparent'
                }
              ]}
              onPress={() => toggleCondition(condition)}
            >
              <Text style={[styles.conditionText, { color: isSelected ? '#FFFFFF' : colors.textPrimary }]}>
                {condition}
              </Text>
              <View style={[
                styles.checkbox,
                { 
                  borderColor: isSelected ? '#FFFFFF' : colors.textSecondary,
                  backgroundColor: isSelected ? '#FFFFFF' : 'transparent'
                }
              ]}>
                {isSelected && <Text style={[styles.checkmark, { color: colors.accent }]}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.selectedLabel, { color: colors.textSecondary }]}>Selected:</Text>
        <View style={styles.selectedPillsContainer}>
          {selectedConditions.map(condition => (
            <TouchableOpacity 
              key={condition} 
              style={[styles.pill, { backgroundColor: colors.pillBg }]}
              onPress={() => toggleCondition(condition)}
            >
              <Text style={[styles.pillText, { color: colors.accent }]}>{condition}</Text>
              <Text style={[styles.pillClose, { color: colors.accent }]}> ×</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.applyButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('MedicalConditionList')}
        >
          <Text style={styles.applyButtonText}>Apply  ✓</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  closeIcon: { fontSize: 24, fontWeight: '300' },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, marginBottom: 20 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  listContainer: { flex: 1 },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  conditionText: { fontSize: 16, fontWeight: '500' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  checkmark: { fontSize: 14, fontWeight: 'bold' },
  footer: { paddingTop: 20, paddingBottom: 30 },
  selectedLabel: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
  selectedPillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  pillText: { fontSize: 14, fontWeight: '600' },
  pillClose: { fontSize: 16, fontWeight: '700', marginLeft: 4 },
  applyButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  applyButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default MedicalConditionSearchScreen;