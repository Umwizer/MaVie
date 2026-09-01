import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../constants/theme'; // adjust path

interface GlowIconProps {
  size?: number;
}

export default function GlowIcon({ size = 32 }: GlowIconProps) {
  const scheme = useColorScheme(); // RN built-in instead of nativewind
  const isDark = scheme === 'dark';
  const iconColor = colors.primary; // '#3D6FF2'

  const layers = isDark
    ? [
        { scale: 4.5, opacity: 0.06 },
        { scale: 3.6, opacity: 0.08 },
        { scale: 2.8, opacity: 0.1 },
        { scale: 2.1, opacity: 0.14 },
        { scale: 1.6, opacity: 0.22 },
      ]
    : [
        { scale: 4.5, opacity: 0.04 },
        { scale: 3.6, opacity: 0.05 },
        { scale: 2.8, opacity: 0.07 },
        { scale: 2.1, opacity: 0.09 },
        { scale: 1.6, opacity: 0.14 },
      ];

  return (
    <View style={[styles.container, { width: size * 5, height: size * 5 }]}>
      {layers.map((layer, i) => (
        <View
          key={i}
          style={[
            styles.glowLayer,
            {
              width: size * layer.scale,
              height: size * layer.scale,
              opacity: layer.opacity,
              backgroundColor: iconColor,
            },
          ]}
        />
      ))}
      <Feather name="plus" size={size} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowLayer: {
    position: 'absolute',
    borderRadius: 9999, // rounded-full
  },
});