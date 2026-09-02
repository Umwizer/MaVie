import { useRef, useState } from "react";
import {
  View, Text, StyleSheet, FlatList, Pressable, Dimensions, ListRenderItemInfo,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { colors } from "../../constants/theme";
import { SLIDES, Slide } from "../../constants/onboardingSlides";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingSlides">;
const { width } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);
  const isLast = index === SLIDES.length - 1;

  const goTo = (i: number) => {
    if (i < 0 || i >= SLIDES.length) return;
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => {
    const VisualComponent = item.Visual;
        return (
        <View style={[styles.slide, { width }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.visualContainer}>
            <VisualComponent />
            </View>
            
        </View>
        );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${((index + 1) / SLIDES.length) * 100}%` },
          ]}
        />
      </View>

      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
      />

      <View style={styles.footer}>
        {!isLast ? (
          <View style={styles.navRow}>
            <Pressable
              style={[styles.navBtn, index === 0 && styles.navBtnDisabled]}
              onPress={() => goTo(index - 1)}
              disabled={index === 0}
            >
              <Text
                style={{
                  color: index === 0 ? colors.navInactive : colors.textPrimary,
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {"<"}
              </Text>
            </Pressable>
            <Pressable style={styles.navBtn} onPress={() => goTo(index + 1)}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {">"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={styles.primaryButtonText}>Let's Get Started</Text>
          </Pressable>
        )}
        <Text style={styles.progressText}>
          {index + 1} / {SLIDES.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 16,
  },
  slide: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  visualContainer: {
    width: 300,
    height: 500,
    marginBottom: 36,           // space between icon/visual and title
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 14,           // space between title and description
    paddingHorizontal: 8,
    lineHeight: 32,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    gap: 16,                    // space between nav row and progress text
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  navBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  navBtnPrimary: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.progressTrack,
    marginHorizontal: 24,
    marginTop: 16,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  progressText: {
    color: colors.textSecondary,
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
  },
});