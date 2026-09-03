// src/components/RichCards.tsx
import React from 'react';
import { View, Text, Image, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { ActivityCardData, MealCardData, ChartCardData } from '../types/chat';
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <View className="mt-2 mb-1 rounded-2xl p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 max-w-[85%] shadow-sm">
      {children}
    </View>
  );
}

function CardHeader({ icon, title, iconColor }: { icon: keyof typeof Feather.glyphMap; title: string; iconColor: string }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View className="flex-row items-center gap-2 mb-3">
      <View
        className="w-8 h-8 rounded-full items-center justify-center"
        style={{ backgroundColor: iconColor + '22' }}
      >
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      <Text className="text-gray-900 dark:text-gray-100 font-semibold text-base">{title}</Text>
    </View>
  );
}
export function ActivityCard({ data }: { data: ActivityCardData }) {
  const stats = [
    { label: 'Duration', value: `${data.durationMin} min` },
    { label: 'Calories', value: `${data.calories} kcal` },
    ...(data.distanceKm ? [{ label: 'Distance', value: `${data.distanceKm} km` }] : []),
  ];

  return (
    <CardShell>
      <CardHeader icon={(data.icon as any) ?? 'activity'} title={data.title} iconColor="#3B82F6" />
      <View className="flex-row justify-between">
        {stats.map((s) => (
          <View key={s.label} className="items-start">
            <Text className="text-gray-400 dark:text-gray-500 text-xs mb-1">{s.label}</Text>
            <Text className="text-gray-900 dark:text-gray-100 font-semibold text-sm">{s.value}</Text>
          </View>
        ))}
      </View>
    </CardShell>
  );
}
export function MealCard({ data }: { data: MealCardData }) {
  const macros = [
    { label: 'Protein', value: data.protein, color: '#22C55E' },
    { label: 'Carbs', value: data.carbs, color: '#F59E0B' },
    { label: 'Fat', value: data.fat, color: '#EF4444' },
  ];
  const totalMacroGrams = macros.reduce((sum, m) => sum + m.value, 0) || 1;

  return (
    <CardShell>
      <View className="flex-row items-center gap-3 mb-3">
        {data.imageUrl ? (
          <Image source={{ uri: data.imageUrl }} className="w-12 h-12 rounded-xl" />
        ) : (
          <View className="w-12 h-12 rounded-xl bg-green-500/20 items-center justify-center">
            <Feather name="coffee" size={20} color="#22C55E" />
          </View>
        )}
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-gray-100 font-semibold text-base">{data.title}</Text>
          <Text className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">{data.calories} kcal</Text>
        </View>
      </View>
      <View className="flex-row h-2 rounded-full overflow-hidden mb-2">
        {macros.map((m) => (
          <View
            key={m.label}
            style={{ backgroundColor: m.color, width: `${(m.value / totalMacroGrams) * 100}%` }}
          />
        ))}
      </View>
      <View className="flex-row justify-between">
        {macros.map((m) => (
          <View key={m.label} className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
            <Text className="text-gray-500 dark:text-gray-400 text-xs">
              {m.label} {m.value}g
            </Text>
          </View>
        ))}
      </View>
    </CardShell>
  );
}
export function ChartCard({ data }: { data: ChartCardData }) {
  const max = Math.max(...data.values, 1);

  return (
    <CardShell>
      <CardHeader icon="bar-chart-2" title={data.title} iconColor="#8B5CF6" />

      {data.average !== undefined && (
        <Text className="text-gray-400 dark:text-gray-500 text-xs mb-3">
          Avg: <Text className="text-gray-900 dark:text-gray-100 font-medium">{data.average} {data.unit}</Text>
        </Text>
      )}

      <View className="flex-row items-end justify-between h-24 mb-2">
        {data.values.map((v, i) => (
          <View key={i} className="items-center flex-1">
            <View
              className="w-3 rounded-full bg-violet-500 dark:bg-violet-400"
              style={{ height: Math.max((v / max) * 80, 4) }}
            />
          </View>
        ))}
      </View>
      <View className="flex-row justify-between">
        {data.labels.map((l, i) => (
          <Text key={i} className="text-gray-400 dark:text-gray-500 text-[10px] flex-1 text-center">
            {l}
          </Text>
        ))}
      </View>
    </CardShell>
  );
}
export function RichCard({ data }: { data: ActivityCardData | MealCardData | ChartCardData }) {
  switch (data.type) {
    case 'activity':
      return <ActivityCard data={data} />;
    case 'meal':
      return <MealCard data={data} />;
    case 'chart':
      return <ChartCard data={data} />;
    default:
      return null;
  }
}