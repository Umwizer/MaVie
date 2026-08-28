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
import type { RootStackParamList } from "../../types/types";
import { colors } from "../../constants/theme";
import { SLIDES, Slide } from "../../constants/onboardingSlides";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const { width } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);

  const listRef = useRef<FlatList<Slide>>(null);

  const isLast = index === SLIDES.length - 1;

  const goTo = (i: number) => {
    if (i < 0 || i >= SLIDES.length) return;

    listRef.current?.scrollToIndex({
      index: i,
      animated: true,
    });

    setIndex(i);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={[styles.slide, { width }]}>
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.description}>
        {item.description}
      </Text>

      <View style={styles.iconWrap}>
        <Ionicons
          name={item.icon}
          size={200}
          color={colors.primary}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${((index + 1) / SLIDES.length) * 100}%`,
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
        onMomentumScrollEnd={(e) => {
          const i = Math.round(
            e.nativeEvent.contentOffset.x / width
          );

          setIndex(i);
        }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        {!isLast ? (
          <>
            <View style={styles.navRow}>
              {/* Previous */}
              <Pressable
                style={styles.navBtn}
                onPress={() => goTo(index - 1)}
                disabled={index === 0}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={
                    index === 0
                      ? colors.navInactive
                      : colors.textPrimary
                  }
                />
              </Pressable>

              {/* Next */}
              <Pressable
                style={styles.navBtn}
                onPress={() => goTo(index + 1)}
              >
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textPrimary}
                />
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Pressable
              style={styles.primaryButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.primaryButtonText}>
                Login
              </Text>
            </Pressable>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.secondaryButtonText}>
                Create Account
              </Text>
            </Pressable>
          </>
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
  },

  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  iconWrap: {
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    color: colors.textSecondary,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 12,
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },

  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.progressTrack,
    overflow: "hidden",
    marginTop: 20,
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
    borderWidth: 1,
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
  },
});