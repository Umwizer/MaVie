import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface GlowIconProps {
  size?: number;
}

export default function GlowIcon({ size = 32 }: GlowIconProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = '#3D6FF2'; // same blue in both modes

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
    <View className="items-center justify-center" style={{ width: size * 5, height: size * 5 }}>
      {layers.map((layer, i) => (
        <View
          key={i}
          className="absolute rounded-full bg-blue-500"
          style={{
            width: size * layer.scale,
            height: size * layer.scale,
            opacity: layer.opacity,
          }}
        />
      ))}
      <Feather name="plus" size={size} color={iconColor} />
    </View>
  );
}