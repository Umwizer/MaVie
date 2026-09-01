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

type DietScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Diet'
>;

const DietScreen = () => {
  const navigation = useNavigation<DietScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [selectedDiet, setSelectedDiet] = useState('Vegetarian');

  const diets = [
    { icon: '🌾', label: 'Balanced Diet', desc: "I'm eating a very balanced diet" },
    { icon: '🥦', label: 'Vegetarian', desc: 'I was a rabbit on my previous life' },
    { icon: '🥚', label: 'Low Carb', desc: 'I am allergic to carbohydrates' },
    { icon: '🍞', label: 'Gluten Free', desc: 'I hate gluten with all of my life' },
  ];

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    cardBg: isDarkMode ? '#111827' : '#F5F6FA',
    cardBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    cardSelectedBg: isDarkMode ? '#1E3A8A' : '#E8EDFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('Calories')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What is your usual{'\n'}eating habits?
        </Text>

        <View style={styles.grid}>
          {diets.map((diet) => {
            const isSelected = selectedDiet === diet.label;
            return (
              <TouchableOpacity
                key={diet.label}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected ? colors.cardSelectedBg : colors.cardBg,
                    borderColor: isSelected ? colors.accent : colors.cardBorder,
                  },
                ]}
                onPress={() => setSelectedDiet(diet.label)}
              >
                <Text style={styles.cardIcon}>{diet.icon}</Text>
                <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>{diet.label}</Text>
                <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{diet.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Calories')}>
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
  content: { flex: 1, paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30, lineHeight: 34 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', padding: 16, borderRadius: 16, borderWidth: 2, marginBottom: 12 },
  cardIcon: { fontSize: 24, marginBottom: 8 },
  cardLabel: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardDesc: { fontSize: 12, lineHeight: 16 },
  footer: { paddingBottom: 30, paddingTop: 10 },
  continueButton: { backgroundColor: '#3B82F6', borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default DietScreen;