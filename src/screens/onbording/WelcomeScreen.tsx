import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
  ListRenderItemInfo,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { colors } from "../../constants/theme";
import { SLIDES, Slide } from "../../constants/onboardingSlides";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <View style={[styles.slide, { width }]}>
      <View style={styles.iconWrap}>
        <Ionicons name={item.icon} size={100} color={colors.primary} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.footer}>
        <View style={styles.navRow}>
          <Pressable style={styles.navBtn} onPress={() => goTo(index - 1)} disabled={index === 0}>
            <Ionicons name="chevron-back" size={20} color={index === 0 ? colors.navInactive : colors.textPrimary} />
          </Pressable>

          <Pressable style={styles.navBtn} onPress={() => goTo(index + 1)} disabled={isLast}>
            <Ionicons name="chevron-forward" size={20} color={isLast ? colors.navInactive : colors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((index + 1) / SLIDES.length) * 100}%` }]} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  slide: { alignItems: "center", justifyContent: "center", paddingHorizontal: 32 },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  title: { color: colors.textPrimary, fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 12 },
  description: { color: colors.textSecondary, fontSize: 14, textAlign: "center", lineHeight: 20 },
  footer: { paddingHorizontal: 24, paddingBottom: 16, gap: 16 },
  navRow: { flexDirection: "row", justifyContent: "center", gap: 12 },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: { height: 3, borderRadius: 2, backgroundColor: colors.progressTrack, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.primary },
});