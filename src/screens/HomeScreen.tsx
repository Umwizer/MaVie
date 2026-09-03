// src/screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [userName, setUserName] = useState('User');
  const [userWeight, setUserWeight] = useState<number | null>(null);
  const [userUnit, setUserUnit] = useState('lbs');
  const [scanResult, setScanResult] = useState<any>(null);
  const [heartRate, setHeartRate] = useState(72);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const greeting = getGreeting();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedWeight = await AsyncStorage.getItem('userWeight');
        const storedUnit = await AsyncStorage.getItem('userWeightUnit');
        const storedResults = await AsyncStorage.getItem('userScanResults');

        if (storedName) setUserName(storedName);
        if (storedWeight) setUserWeight(parseInt(storedWeight));
        if (storedUnit) setUserUnit(storedUnit);
        if (storedResults) setScanResult(JSON.parse(storedResults));
      } catch (e) {
        console.log('Failed to load data');
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    if (scanResult) {
      const hr = scanResult.find((item: any) => item.label === 'Heart Rate');
      if (hr) {
        const hrValue = parseInt(hr.value);
        if (!isNaN(hrValue)) {
          setHeartRate(hrValue);
        }
      }
    }
  }, [scanResult]);

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
    cardBg: isDarkMode ? '#1E293B' : '#F5F6FA',
    cardBorder: isDarkMode ? '#1F2937' : '#E0E0E0',
    orange: '#F59E0B',
    red: '#EF4444',
  };

  const stats = [
    {
      label: 'Weight',
      value: userWeight ? `${userWeight} ${userUnit}` : '--',
      icon: '⚖️',
      color: colors.orange,
    },
    {
      label: 'BMI / Calories',
      value: scanResult ? `${scanResult[2].value}` : '1,850 kcal',
      icon: scanResult ? '📊' : '🔥',
      color: colors.orange,
    },
    {
      label: 'Heart Rate',
      value: `${heartRate} bpm`,
      icon: '❤️',
      color: colors.red,
    },
  ];

  const goals = [
    { title: 'Drink 2L of water', progress: 75 },
    { title: 'Walk 30 minutes', progress: 50 },
    { title: 'Take evening medication', progress: 100 },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>{greeting},</Text>
            <Text style={[styles.name, { color: colors.textPrimary }]}>{userName} 👋</Text>
          </View>
          
          <View style={styles.headerRight}>
            {/* BACK BUTTON */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={[styles.backButtonText, { color: colors.textPrimary }]}>←</Text>
            </TouchableOpacity>
            
            <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Today's Summary</Text>
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Daily Goals</Text>
        <View style={styles.goalsContainer}>
          {goals.map((goal, index) => (
            <View key={index} style={[styles.goalCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.goalInfo}>
                <Text style={[styles.goalTitle, { color: colors.textPrimary }]}>{goal.title}</Text>
                <Text style={[styles.goalPercent, { color: colors.textSecondary }]}>{goal.progress}%</Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: colors.cardBorder }]}>
                <View style={[styles.progressBarFill, { width: `${goal.progress}%`, backgroundColor: colors.accent }]} />
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={styles.actionIcon}>💊</Text>
            <Text style={[styles.actionText, { color: colors.textPrimary }]}>Meds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={styles.actionIcon}>🍎</Text>
            <Text style={[styles.actionText, { color: colors.textPrimary }]}>Nutrition</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={styles.actionIcon}>🏃</Text>
            <Text style={[styles.actionText, { color: colors.textPrimary }]}>Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 24 },
  greeting: { fontSize: 14 },
  name: { fontSize: 24, fontWeight: '700', marginTop: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: { padding: 4 },
  backButtonText: { fontSize: 28, fontWeight: '300' },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, marginHorizontal: 4, alignItems: 'center' },
  statIcon: { fontSize: 24, marginBottom: 8 },
  statValue: { fontSize: 16, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 4 },
  goalsContainer: { gap: 12, marginBottom: 24 },
  goalCard: { padding: 16, borderRadius: 12, borderWidth: 1 },
  goalInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  goalTitle: { fontSize: 16, fontWeight: '600' },
  goalPercent: { fontSize: 14 },
  progressBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  actionButton: { flex: 1, padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center', marginHorizontal: 4 },
  actionIcon: { fontSize: 24, marginBottom: 8 },
  actionText: { fontSize: 12, fontWeight: '600' },
});

export default HomeScreen;