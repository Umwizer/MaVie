// src/screens/onbording/MedicalConditionListScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type MedicalConditionListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MedicalConditionList'
>;

const MedicalConditionListScreen = () => {
  const navigation = useNavigation<MedicalConditionListScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const conditions = [
    'Hypertension',
    'Asthma',
    'Allergies',
    'Arthritis',
    'Obesity',
    'Depression',
    'Chronic Pain',
    'Diabetes',
  ];

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
    tagBg: isDarkMode ? '#1E293B' : '#F5F6FA',
    tagBorder: isDarkMode ? '#334155' : '#E0E0E0',
    selectedTagBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('NextScreen')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Please specify your{'\n'}medical condition
        </Text>

        {/* Most Common & Search Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Most Common</Text>
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={() => navigation.navigate('MedicalConditionSearch')} // <-- FIXED: Navigates to Search Screen
          >
            <Text style={[styles.searchText, { color: colors.accent }]}>🔍  Search</Text>
          </TouchableOpacity>
        </View>

        {/* Conditions Grid */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.gridContainer}>
          <View style={styles.grid}>
            {conditions.map((condition) => {
              const isSelected = selectedConditions.includes(condition);
              return (
                <TouchableOpacity
                  key={condition}
                  style={[
                    styles.conditionCard,
                    {
                      backgroundColor: isSelected ? colors.selectedTagBg : colors.tagBg,
                      borderColor: isSelected ? colors.accent : colors.tagBorder,
                    },
                  ]}
                  onPress={() => toggleCondition(condition)}
                >
                  <Text style={[styles.conditionText, { color: isSelected ? colors.accent : colors.textPrimary }]}>
                    {condition}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

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
          style={[styles.continueButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('NextScreen')}
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.noButton, { borderColor: colors.accent }]}
          onPress={() => navigation.navigate('NextScreen')}
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
  title: { fontSize: 28, fontWeight: '700', marginBottom: 30, lineHeight: 34 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  searchButton: { padding: 5 },
  searchText: { fontSize: 16, fontWeight: '600' },
  gridContainer: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  conditionCard: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, width: '47%' },
  conditionText: { fontSize: 16, fontWeight: '600' },
  footer: { paddingTop: 20, paddingBottom: 30 },
  selectedLabel: { fontSize: 14, textAlign: 'center', marginBottom: 10 },
  selectedPillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  pillText: { fontSize: 14, fontWeight: '600' },
  pillClose: { fontSize: 16, fontWeight: '700', marginLeft: 4 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  noButton: { borderRadius: 30, borderWidth: 1, paddingVertical: 16, alignItems: 'center', marginTop: 12 },
  noButtonText: { fontSize: 16, fontWeight: '500' },
});

export default MedicalConditionListScreen;