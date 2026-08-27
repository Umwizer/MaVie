import { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  SafeAreaView,
  ListRenderItemInfo,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/types";
import { SLIDES, Slide } from "../../constants/onboardingSlides";
import SlideVisualCard from "../../components/SlidesVisualCard";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const { width } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const isLast = index === SLIDES.length - 1;

  const goTo = (i: number) => {
    if (i < 0 || i >= SLIDES.length) return;
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View className="flex-1 items-center pt-8 px-6 pb-2" style={{ width }}>
      <Text className="text-textPrimary text-[22px] font-bold text-center mb-2.5">
        {item.title}
      </Text>
      <Text className="text-textSecondary text-sm text-center leading-5 mb-5">
        {item.description}
      </Text>

      <SlideVisualCard icon={item.icon} accent={item.accent} caption={item.caption} />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
      />

      <View className="px-6 pb-4 gap-4">
        <View className="flex-row justify-center gap-3">
          <Pressable
            className="w-10 h-10 rounded-full bg-card items-center justify-center"
            onPress={() => goTo(index - 1)}
            disabled={index === 0}
          >
            <Ionicons name="chevron-back" size={20} color={index === 0 ? "#3A4256" : "#FFFFFF"} />
          </Pressable>

          <Pressable
            className="w-10 h-10 rounded-full bg-card items-center justify-center"
            onPress={() => goTo(index + 1)}
            disabled={isLast}
          >
            <Ionicons name="chevron-forward" size={20} color={isLast ? "#3A4256" : "#FFFFFF"} />
          </Pressable>
        </View>

        <View className="h-[3px] rounded-full bg-progressTrack overflow-hidden">
          <View
            className="h-full bg-primary"
            style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}