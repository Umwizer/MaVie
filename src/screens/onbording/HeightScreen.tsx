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
import type { RootStackParamList } from '../../navigation/types';

type HeightScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Height'
>;

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 80;

const HeightScreen = () => {
  const navigation = useNavigation<HeightScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
  const [height, setHeight] = useState(162);
  const [selectedIndex, setSelectedIndex] = useState(42); // 162 cm

  const values = Array.from({ length: 121 }, (_, i) => (unit === 'cm' ? 120 + i : 48 + i));
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const index = values.indexOf(height);
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
      setHeight(values[index]);
    }
  };

  const toggleUnit = (newUnit: 'cm' | 'inch') => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    const converted = newUnit === 'cm' ? Math.round(height * 2.54) : Math.round(height / 2.54);
    setHeight(converted);
  };

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    textFaded: isDarkMode ? '#2D3748' : '#E2E8F0',
    accent: '#3B82F6',
    tabBg: isDarkMode ? '#1E293B' : '#F0F0F0',
    tabActiveBg: isDarkMode ? '#334155' : '#FFFFFF',
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
          <TouchableOpacity onPress={() => navigation.navigate('BloodType')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>What is your height?</Text>

        <View style={[styles.toggleContainer, { backgroundColor: colors.tabBg }]}>
          <TouchableOpacity 
            style={[styles.toggleBtn, { backgroundColor: unit === 'cm' ? colors.tabActiveBg : 'transparent' }]}
            onPress={() => toggleUnit('cm')}
          >
            <Text style={[styles.toggleText, { color: unit === 'cm' ? colors.textPrimary : colors.textSecondary }]}>cm</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, { backgroundColor: unit === 'inch' ? colors.tabActiveBg : 'transparent' }]}
            onPress={() => toggleUnit('inch')}
          >
            <Text style={[styles.toggleText, { color: unit === 'inch' ? colors.textPrimary : colors.textSecondary }]}>inch</Text>
          </TouchableOpacity>
        </View>

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

          {/* Center Highlight Box - Only the selected number is highlighted */}
          <View style={[styles.centerBox, { borderColor: colors.accent, backgroundColor: colors.accent + '20' }]} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.continueButton, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('BloodType')}>
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

export default HeightScreen;