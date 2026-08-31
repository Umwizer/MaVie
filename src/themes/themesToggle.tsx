import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Feather } from '@expo/vector-icons';

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable
      onPress={toggleColorScheme}
      className="flex-row items-center gap-2 rounded-full px-3 py-2 bg-gray-100 dark:bg-gray-800"
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Feather
        name={isDark ? 'moon' : 'sun'}
        size={16}
        color={isDark ? '#9AA0B4' : '#5B6072'}
      />
      <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {isDark ? 'Dark' : 'Light'}
      </Text>
    </Pressable>
  );
}