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

type BloodTypeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BloodType'
>;

const BloodTypeScreen = () => {
  const navigation = useNavigation<BloodTypeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [selectedType, setSelectedType] = useState('A');
  const [rhFactor, setRhFactor] = useState('-');

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    tabBg: isDarkMode ? '#1E293B' : '#F0F0F0',
    tabActiveBg: isDarkMode ? '#334155' : '#FFFFFF',
    bloodRed: '#EF4444',
    buttonBg: isDarkMode ? '#1E293B' : '#E2E8F0',
  };

  const bloodTypes = ['A', 'B', 'AB', 'O'];

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
          <TouchableOpacity onPress={() => navigation.navigate('FitnessLevel')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What's your official{'\n'}blood type?
        </Text>

        <View style={[styles.toggleContainer, { backgroundColor: colors.tabBg }]}>
          {bloodTypes.map((type) => (
            <TouchableOpacity 
              key={type}
              style={[styles.toggleBtn, { backgroundColor: selectedType === type ? colors.tabActiveBg : 'transparent' }]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[styles.toggleText, { color: selectedType === type ? colors.textPrimary : colors.textSecondary, fontWeight: selectedType === type ? '800' : '500' }]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.displayContainer}>
          <Text style={[styles.bigLetter, { color: colors.textPrimary }]}>{selectedType}</Text>
          <TouchableOpacity 
            style={[styles.rhBadge, { backgroundColor: colors.bloodRed }]}
            onPress={() => setRhFactor(rhFactor === '-' ? '+' : '-')}
          >
            <Text style={styles.rhText}>{rhFactor}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.rhButton, { backgroundColor: colors.buttonBg }]}
            onPress={() => setRhFactor('+')}
          >
            <Text style={[styles.rhButtonText, { color: colors.textPrimary }]}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.rhButton, { backgroundColor: colors.buttonBg }]}
            onPress={() => setRhFactor('-')}
          >
            <Text style={[styles.rhButtonText, { color: colors.textPrimary }]}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('FitnessLevel')}>
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
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 30, lineHeight: 34 },
  toggleContainer: { flexDirection: 'row', justifyContent: 'space-between', borderRadius: 12, padding: 4, marginBottom: 40 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  toggleText: { fontSize: 16 },
  displayContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  bigLetter: { fontSize: 100, fontWeight: '900', lineHeight: 110 },
  rhBadge: { width: 60, height: 60, borderRadius: 30, marginLeft: 12, justifyContent: 'center', alignItems: 'center' },
  rhText: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  rhButton: { flex: 1, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  rhButtonText: { fontSize: 24, fontWeight: '700' },
  footer: { paddingBottom: 30, paddingTop: 20 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default BloodTypeScreen;