// src/screens/onbording/BirthDateScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type BirthDateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BirthDate'
>;

const BirthDateScreen = () => {
  const navigation = useNavigation<BirthDateScreenNavigationProp>();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const statusBarStyle: 'light' | 'dark' = isDarkMode ? 'light' : 'dark';

  // State for selected month, day, and year
  const [month, setMonth] = useState<string>('1');
  const [day, setDay] = useState<string>('1');
  const [year, setYear] = useState<string>('2000');

  const colors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    cardBg: isDarkMode ? '#1E1E1E' : '#F5F6FA',
    cardBorder: isDarkMode ? '#333333' : '#E0E0E0',
    buttonBg: '#4A6FFF',
    accent: '#4A6FFF',
  };

  const getDaysInMonth = (monthStr: string, yearStr: string) => {
    const m = parseInt(monthStr);
    const y = parseInt(yearStr);
    return new Date(y, m, 0).getDate();
  };

  const daysInCurrentMonth = getDaysInMonth(month, year);
  const days = Array.from({ length: daysInCurrentMonth }, (_, i) => (i + 1).toString());

  React.useEffect(() => {
    if (parseInt(day) > daysInCurrentMonth) {
      setDay(daysInCurrentMonth.toString());
    }
  }, [daysInCurrentMonth, day]);

  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - i).toString());

  const calculateAge = () => {
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const age = calculateAge();
  const isFormComplete = month && day && year;

  const CustomPicker = ({ label, values, value, onSelect }: { label: string, values: string[], value: string, onSelect: (val: string) => void }) => (
    <View style={styles.pickerWrapper}>
      <Text style={[styles.pickerLabel, { color: colors.textSecondary }]}>{label}</Text>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={[styles.customPickerScroll, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        contentContainerStyle={styles.pickerContent}
      >
        {values.map((val) => {
          const isSelected = value === val;
          return (
            <TouchableOpacity
              key={val}
              style={[
                styles.customPickerItem,
                { backgroundColor: isSelected ? colors.buttonBg : 'transparent' }
              ]}
              onPress={() => onSelect(val)}
            >
              <Text style={{ 
                color: isSelected ? '#FFFFFF' : colors.textPrimary, 
                fontWeight: isSelected ? '700' : '400' 
              }}>
                {label === 'Month' ? new Date(2000, parseInt(val) - 1, 1).toLocaleString('default', { month: 'short' }) : val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={statusBarStyle} />

      {/* Header: Back on left, Dark Mode Toggle + Skip on right */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleDarkMode}>
            <Text style={styles.themeToggleText}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HealthGoals')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Centered Content Area */}
      <View style={styles.centerContent}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          When were you born?
        </Text>

        <View style={styles.wheelsContainer}>
          <CustomPicker label="Month" values={months} value={month} onSelect={setMonth} />
          <CustomPicker label="Day" values={days} value={day} onSelect={setDay} />
          <CustomPicker label="Year" values={years} value={year} onSelect={setYear} />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.footer}>
        {isFormComplete ? (
          <View style={styles.ageResultContainer}>
            <Text style={[styles.ageResultText, { color: colors.accent }]}>
              I am {age} years old
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isFormComplete ? colors.buttonBg : colors.cardBg }
          ]}
          disabled={!isFormComplete}
          onPress={() => {
            if (age !== null) {
              console.log('Age:', age);
              navigation.navigate('HealthGoals');
            }
          }}
        >
          <Text style={[
            styles.continueButtonText,
            { color: isFormComplete ? '#FFFFFF' : colors.textSecondary }
          ]}>
            Continue →
          </Text>
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
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeToggleText: {
    fontSize: 22,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  wheelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  pickerWrapper: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  customPickerScroll: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
  },
  pickerContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  customPickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'center',
  },
  footer: {
    paddingBottom: 40,
    paddingTop: 20,
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  ageResultContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ageResultText: {
    fontSize: 22,
    fontWeight: '700',
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4A6FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default BirthDateScreen;