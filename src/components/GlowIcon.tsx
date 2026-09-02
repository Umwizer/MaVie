// src/components/GlowIcon.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type GlowIconProps = {
  color?: string;
  size?: number;
};

const GlowIcon = ({ color = '#4A6FFF', size = 60 }: GlowIconProps) => {
  return (
    <View style={[styles.container, { backgroundColor: color, width: size, height: size }]}>
      <Text style={styles.plus}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A6FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  plus: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default GlowIcon;