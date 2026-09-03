// src/screens/onbording/WeightScreen.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from '../../navigation/types';

type WeightScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Weight'
>;

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;

const WeightScreen = () => {
  const navigation = useNavigation<WeightScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');
  const [weight, setWeight] = useState(150);
  const [selectedIndex, setSelectedIndex] = useState(145);

  // ✅ FINAL, INCLUSIVE RANGE: 5 lbs to 350 lbs / 2 kg to 160 kg
  const values = Array.from({ length: 346 }, (_, i) => (unit === 'lbs' ? 5 + i : 2 + i));
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const loadWeight = async () => {
      try {
        const savedWeight = await AsyncStorage.getItem('userWeight');
        const savedUnit = await AsyncStorage.getItem('userWeightUnit');
        if (savedWeight) setWeight(parseInt(savedWeight));
        if (savedUnit) setUnit(savedUnit as 'lbs' | 'kg');
      } catch (e) {
        console.log('Failed to load weight');
      }
    };
    loadWeight();
  }, []);

  useEffect(() => {
    const index = values.indexOf(weight);
    if (index !== -1 && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: index * ITEM_WIDTH, animated: false });
      }, 100);
    }
  }, [unit, values]);

  const onMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH);
    if (values[index]) {
      setSelectedIndex(index);
      setWeight(values[index]);
    }
  };

  const toggleUnit = (newUnit: 'lbs' | 'kg') => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    const converted = newUnit === 'kg' ? Math.round(weight * 0.453592) : Math.round(weight * 2.20462);
    setWeight(converted);
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('userWeight', weight.toString());
      await AsyncStorage.setItem('userWeightUnit', unit);
      navigation.navigate('Height');
    } catch (e) {
      console.log('Failed to save weight');
    }
  };

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    textFaded: isDarkMode ? '#2D3748' : '#E2E8F0',
    accent: '#4A6FFF',
    tabBg: isDarkMode ? '#1E293B' : '#F0F0F0',
    tabActiveBg: isDarkMode ? '#334155' : '#FFFFFF',
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
          <TouchableOpacity onPress={handleContinue}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          What is your weight?
        </Text>

        {/* Unit Toggle */}
        <View style={[styles.toggleContainer, { backgroundColor: colors.tabBg }]}>
          <TouchableOpacity 
            style={[styles.toggleBtn, { backgroundColor: unit === 'lbs' ? colors.tabActiveBg : 'transparent' }]}
            onPress={() => toggleUnit('lbs')}
          >
            <Text style={[styles.toggleText, { color: unit === 'lbs' ? colors.textPrimary : colors.textSecondary }]}>lbs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, { backgroundColor: unit === 'kg' ? colors.tabActiveBg : 'transparent' }]}
            onPress={() => toggleUnit('kg')}
          >
            <Text style={[styles.toggleText, { color: unit === 'kg' ? colors.textPrimary : colors.textSecondary }]}>kg</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
            onMomentumScrollEnd={onMomentumScrollEnd}
          >
            {values.map((val, index) => (
              <View key={index} style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
                <Text style={[
                  styles.carouselText, 
                  index === selectedIndex 
                    ? { color: colors.accent, fontSize: 44, fontWeight: '800' } 
                    : { color: colors.textFaded, fontSize: 32, fontWeight: '400' }
                ]}>
                  {val}
                </Text>
              </View>
            ))}
          </ScrollView>
          <View style={[styles.centerBox, { borderColor: colors.accent, backgroundColor: colors.accent + '20' }]} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.accent }]} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue →</Text>
          </TouchableOpacity>
        </View>
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
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  toggleContainer: { flexDirection: 'row', borderRadius: 12, padding: 4, marginBottom: 40, width: '70%', alignSelf: 'center' },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  toggleText: { fontSize: 16, fontWeight: '600' },
  carouselContainer: { height: 100, justifyContent: 'center' },
  itemContainer: { height: 80, justifyContent: 'center', alignItems: 'center' },
  carouselText: { textAlign: 'center' },
  centerBox: { position: 'absolute', top: 0, bottom: 0, width: 100, borderRadius: 16, borderWidth: 2, left: '50%', marginLeft: -50 },
  footer: { paddingBottom: 30, paddingTop: 20 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default WeightScreen;