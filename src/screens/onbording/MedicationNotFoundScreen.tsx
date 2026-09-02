// src/screens/onbording/MedicationNotFoundScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type MedicationNotFoundScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MedicationNotFound'
>;

type MedicationNotFoundScreenRouteProp = RouteProp<
  RootStackParamList,
  'MedicationNotFound'
>;

const MedicationNotFoundScreen = () => {
  const navigation = useNavigation<MedicationNotFoundScreenNavigationProp>();
  const route = useRoute<MedicationNotFoundScreenRouteProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const searchedMedication = route.params?.searchedMedication || 'that medication';

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    errorBg: '#3B0D0D',
    errorIcon: '#FF4D4D',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Browse Medications</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.closeIcon, { color: colors.textPrimary }]}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.errorCircle, { backgroundColor: colors.errorBg }]}>
          <Text style={[styles.errorX, { color: colors.errorIcon }]}>✕</Text>
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Whoops! not found.
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We couldn't find "{searchedMedication}". Please try{'\n'}another keyword.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, { backgroundColor: colors.accent }]} 
          onPress={() => navigation.navigate('Allergy')} // <-- Goes to Allergy
        >
          <Text style={styles.continueButtonText}>Continue →</Text>
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
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 80 },
  errorCircle: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  errorX: { fontSize: 30, fontWeight: '900' },
  title: { fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  footer: { paddingBottom: 30 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default MedicationNotFoundScreen;