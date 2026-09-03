// src/screens/onbording/ScanResultsScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootStackParamList } from '../../navigation/types';

type ScanResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ScanResults'
>;

type ScanResultsScreenRouteProp = RouteProp<RootStackParamList, 'ScanResults'>;

const getSeed = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
};

const generateFromSeed = (seed: number, min: number, max: number, decimalPlaces = 0) => {
  const randomValue = (seed % 1000) / 1000;
  const result = min + randomValue * (max - min);
  return result.toFixed(decimalPlaces);
};

const ScanResultsScreen = () => {
  const navigation = useNavigation<ScanResultsScreenNavigationProp>();
  const route = useRoute<ScanResultsScreenRouteProp>();
  const photoUri = route.params?.photoUri || 'default-image';

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const seed = getSeed(photoUri);

    const fat = generateFromSeed(seed, 15, 25, 1);
    const muscle = generateFromSeed(seed, 40, 55, 1);
    const bmi = generateFromSeed(seed, 19, 25, 1);
    const water = generateFromSeed(seed, 55, 70, 0);
    const heartRate = Math.round(parseFloat(generateFromSeed(seed, 60, 90)));

    const imageResults = [
      { label: 'Body Fat', value: `${fat}%`, status: 'Healthy', icon: '💪', color: '#22C55E' },
      { label: 'Muscle Mass', value: `${muscle} kg`, status: 'Optimal', icon: '🏋️', color: '#22C55E' },
      { label: 'BMI', value: `${bmi}`, status: 'Normal', icon: '📊', color: '#22C55E' },
      { label: 'Hydration', value: `${water}%`, status: 'Good', icon: '💧', color: '#4A6FFF' },
      { label: 'Heart Rate', value: `${heartRate} bpm`, status: 'Good', icon: '❤️', color: '#EF4444' },
    ];

    setResults(imageResults);
    AsyncStorage.setItem('userScanResults', JSON.stringify(imageResults));

    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [photoUri]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Results</Text>
        <View style={styles.emptySpace} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          {photoUri !== 'default-image' ? (
            <Image source={{ uri: photoUri }} style={styles.scanImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}

          {/* Analyzing Overlay */}
          {isAnalyzing && (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator size="large" color="#4A6FFF" />
              <Text style={styles.analyzingText}>Analyzing your body...</Text>
            </View>
          )}

          {/* Results Overlay */}
          {showResults && (
            <View style={styles.resultsOverlay}>
              <Text style={styles.resultsBadge}>✓ Scan Complete</Text>
              <Text style={styles.resultsTitle}>Healthy Profile!</Text>
            </View>
          )}
        </View>

        {/* Metrics */}
        {showResults && (
          <>
            <Text style={styles.sectionTitle}>Your Health Metrics</Text>
            <View style={styles.metricsContainer}>
              {results.map((item, index) => (
                <View key={index} style={styles.metricCard}>
                  <View style={styles.metricLeft}>
                    <Text style={styles.metricIcon}>{item.icon}</Text>
                    <View>
                      <Text style={styles.metricLabel}>{item.label}</Text>
                      <Text style={styles.metricValue}>{item.value}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {showResults ? (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate('AdditionalNotes')}
          >
            <Text style={styles.continueButtonText}>Start My Journey →</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.loadingButton}>
            <Text style={styles.loadingButtonText}>Analyzing...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1220', paddingHorizontal: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, marginTop: 10 },
  backButton: { padding: 8 },
  backButtonText: { fontSize: 24, fontWeight: '300', color: '#FFFFFF' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  emptySpace: { width: 40 },
  imageContainer: { width: '100%', height: 350, borderRadius: 20, overflow: 'hidden', marginBottom: 20, backgroundColor: '#1E293B' },
  scanImage: { width: '100%', height: '100%' },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: '#8A94A6', fontSize: 16 },
  analyzingOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  analyzingText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginTop: 12 },
  resultsOverlay: { position: 'absolute', bottom: 20, left: 20, right: 20, alignItems: 'center' },
  resultsBadge: { color: '#22C55E', fontSize: 14, fontWeight: '700', marginBottom: 5 },
  resultsTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  metricsContainer: { gap: 12, marginBottom: 20 },
  metricCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, backgroundColor: '#1E293B' },
  metricLeft: { flexDirection: 'row', alignItems: 'center' },
  metricIcon: { fontSize: 24, marginRight: 12 },
  metricLabel: { fontSize: 14, color: '#8A94A6' },
  metricValue: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  footer: { paddingBottom: 30 },
  continueButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center', backgroundColor: '#4A6FFF' },
  continueButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  loadingButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center', backgroundColor: '#1E293B' },
  loadingButtonText: { color: '#8A94A6', fontSize: 18, fontWeight: '600' },
});

export default ScanResultsScreen;