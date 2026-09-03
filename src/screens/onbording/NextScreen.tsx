// src/screens/onbording/NextScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../navigation/types';

type NextScreenRouteProp = RouteProp<RootStackParamList, 'NextScreen'>;

const NextScreen = () => {
  const route = useRoute<NextScreenRouteProp>();
  const photoUri = route.params?.photoUri;

  return (
    <SafeAreaView style={styles.container}>
      {photoUri ? (
        <>
          <Text style={styles.title}>Scan Complete!</Text>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        </>
      ) : (
        <Text style={styles.title}>Onboarding Complete!</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B1220',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  previewImage: {
    width: 300,
    height: 400,
    borderRadius: 16,
  },
});

export default NextScreen;