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
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/types";
import { colors } from "../../constants/theme";
import { SLIDES, Slide } from "../../constants/onboardingSlides";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OnboardingScreen"
>;

const { width } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);

  const listRef = useRef<FlatList<Slide>>(null);

  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;

  const goTo = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= SLIDES.length) {
      return;
    }

    listRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });

    setIndex(newIndex);
  };

  const renderItem = ({
    item,
  }: ListRenderItemInfo<Slide>) => {
    const VisualComponent = item.Visual;

    return (
      <View style={styles.slide}>
        <View style={styles.visualContainer}>
          <VisualComponent />
        </View>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>
    );
  };

  const handleScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / width
    );

    setIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${
                ((index + 1) / SLIDES.length) * 100
              }%`,
            },
          ]}
        />
      </View>

      {/* Slides */}
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.list}
      />

      {/* Footer */}
      <View style={styles.footer}>
        {!isLast ? (
          <View style={styles.navigationContainer}>
            {/* Back button */}
            <Pressable
              style={[
                styles.circleButton,
                isFirst && styles.circleButtonDisabled,
              ]}
              onPress={() => goTo(index - 1)}
              disabled={isFirst}
            >
              <Ionicons
                name="chevron-back"
                size={20}
                color={
                  isFirst
                    ? colors.navInactive
                    : colors.textPrimary
                }
              />
            </Pressable>

            {/* Next button */}
            <Pressable
              style={styles.circleButton}
              onPress={() => goTo(index + 1)}
            >
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textPrimary}
              />
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>
              Continue
            </Text>
          </Pressable>
        )}

        {/* Slide number */}
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
  },

  list: {
    flex: 1,
  },

  slide: {
    width: width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  visualContainer: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  description: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },

  /* Progress bar */

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

  /* Footer */

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },

  /* Back + Next container */

  navigationContainer: {
    flexDirection: "row",

    /*
     * Small gap between the two circles
     */
    gap: 12,

    /*
     * Keeps the buttons together in the center
     */
    justifyContent: "center",
    alignItems: "center",
  },

  /* Circular buttons */

  circleButton: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: colors.cardBackground,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: colors.border,
  },

  circleButtonDisabled: {
    opacity: 0.35,
  },

  /* Continue button */

  primaryButton: {
    width: "100%",
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

  /* Slide counter */

  progressText: {
    color: colors.textSecondary,
    textAlign: "center",
    fontSize: 12,
    marginTop: 12,
  },
});
