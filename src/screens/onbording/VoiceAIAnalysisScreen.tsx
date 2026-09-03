// src/screens/onbording/VoiceAIAnalysisScreen.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import type { RootStackParamList } from '../../navigation/types';

type VoiceAIAnalysisScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VoiceAIAnalysis'
>;

const VoiceAIAnalysisScreen = () => {
  const navigation = useNavigation<VoiceAIAnalysisScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  // Smooth Waveform animation value
  const waveAnim = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;

  const colors = {
    background: isDarkMode ? '#0B1220' : '#FFFFFF',
    textPrimary: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    textSecondary: isDarkMode ? '#8A94A6' : '#666666',
    accent: '#4A6FFF',
  };

  // Start recording
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);

      // Start smooth waveform animation
      Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        })
      ).start();

      Animated.loop(
        Animated.timing(waveAnim2, {
          toValue: 1,
          duration: 1300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        })
      ).start();
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Stop recording and go to HOME
  const stopRecording = async () => {
    setIsRecording(false);
    waveAnim.stopAnimation();
    waveAnim.setValue(0);
    waveAnim2.stopAnimation();
    waveAnim2.setValue(0);

    if (recording) {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setRecording(null);
    }

    // ✅ GO STRAIGHT TO HOME
    navigation.navigate('Home');
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
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.skipText, { color: colors.accent }]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Voice AI Analysis
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Any medical or health notes will be helpful for{'\n'}Dr. MaVie AI. Feel free to write any.
        </Text>

        {/* Smooth Waveform Area */}
        <View style={styles.waveformContainer}>
          {isRecording ? (
            <View style={styles.waveform}>
              {[...Array(20)].map((_, index) => {
                const isBig = index % 2 === 0;
                const interpolateAnim = waveAnim;
                const outputRange = isBig ? [15, 100, 15] : [10, 60, 10];
                
                return (
                  <Animated.View
                    key={`wave-${index}`}
                    style={[
                      styles.waveBar,
                      {
                        backgroundColor: colors.accent,
                        height: interpolateAnim.interpolate({
                          inputRange: [0, 0.5, 1],
                          outputRange: outputRange,
                        }),
                      },
                    ]}
                  />
                );
              })}
            </View>
          ) : (
            <View style={[styles.flatLine, { backgroundColor: colors.accent }]} />
          )}
        </View>

        {/* Recording Text */}
        <Text style={[styles.commitText, { color: colors.textPrimary }]}>
          I commit to MaVie and I{'\n'}want a healthier life
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.recordButton, { backgroundColor: colors.accent }]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? 'Stop Recording  ⏹' : 'Ready  🎙️'}
          </Text>
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
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  waveformContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  flatLine: {
    width: '100%',
    height: 3,
  },
  commitText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 26,
  },
  footer: { paddingBottom: 30 },
  recordButton: { borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  recordButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default VoiceAIAnalysisScreen;