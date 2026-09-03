// src/screens/onbording/BodyScanScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { RootStackParamList } from '../../navigation/types';

type BodyScanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BodyScan'
>;

const { width, height } = Dimensions.get('window');

const BodyScanScreen = () => {
  const navigation = useNavigation<BodyScanScreenNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<'front' | 'back'>('front');

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          // ✅ CROP PHOTO TO CENTER (Removes background people)
          const cropWidth = Math.floor(photo.width * 0.6);
          const cropHeight = Math.floor(photo.height * 0.4);
          const originX = Math.floor((photo.width - cropWidth) / 2);
          const originY = Math.floor((photo.height - cropHeight) / 2);

          const croppedImage = await ImageManipulator.manipulateAsync(
            photo.uri,
            [
              {
                crop: {
                  originX,
                  originY,
                  width: cropWidth,
                  height: cropHeight,
                },
              },
            ],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );

          navigation.navigate('ScanResults', { photoUri: croppedImage.uri });
        }
      } catch (error) {
        Alert.alert('Error', 'Could not take picture. Please try again.');
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar style="light" />
        <Text style={styles.permissionText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar style="light" />
        <Text style={styles.permissionTitle}>We need your permission</Text>
        <Text style={styles.permissionText}>
          Please allow camera access so we can take your body scan picture.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        {/* Top Header Icons */}
        <View style={styles.headerContainer}>
          <View style={styles.vitalCard}>
            <Text style={styles.vitalEmoji}>💧</Text>
            <Text style={styles.vitalValue}>128</Text>
            <Text style={styles.vitalUnit}>mmHg</Text>
          </View>

          <View style={styles.vitalCard}>
            <Text style={styles.vitalEmoji}>❤️</Text>
            <Text style={styles.vitalValue}>72</Text>
            <Text style={styles.vitalUnit}>bpm</Text>
          </View>
        </View>

        {/* Clean Camera View - No Frames! */}
        <View style={styles.cleanArea} />

        {/* Bottom Instruction */}
        <View style={styles.instructionContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => setFacing(facing === 'front' ? 'back' : 'front')}
          >
            <Text style={styles.flipButtonIcon}>🔄</Text>
          </TouchableOpacity>

          <View style={styles.instructionPill}>
            <Text style={styles.instructionIcon}>📷</Text>
            <Text style={styles.instructionText}>Please hold still...</Text>
          </View>

          <TouchableOpacity style={styles.scanButton} onPress={takePicture}>
            <Text style={styles.scanButtonIcon}>📸</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0B1220',
  },
  permissionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  permissionText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  vitalEmoji: {
    fontSize: 14,
    marginBottom: 2,
  },
  vitalValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  vitalUnit: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  cleanArea: {
    flex: 1,
  },
  instructionContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 16,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  instructionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  instructionIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scanButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#FFFFFF',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonIcon: {
    fontSize: 30,
  },
});

export default BodyScanScreen;