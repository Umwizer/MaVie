import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { colors } from "../../constants/theme";

type Props = NativeStackScreenProps<RootStackParamList, "WelcomeBoard">;

const RING_ICONS: {
  name: keyof typeof Ionicons.glyphMap;
  bg: string;
  angle: number;
  radius: number;
}[] = [
  { name: "heart", bg: "#FF6B6B", angle: 0, radius: 95 },
  { name: "nutrition", bg: "#4ECDC4", angle: 45, radius: 95 },
  { name: "fitness", bg: "#FFD166", angle: 90, radius: 95 },
  { name: "water", bg: "#6C5CE7", angle: 135, radius: 95 },
  { name: "moon", bg: "#A29BFE", angle: 180, radius: 95 },
  { name: "pulse", bg: "#FF7675", angle: 225, radius: 95 },
  { name: "medkit", bg: "#00CEC9", angle: 270, radius: 95 },
  { name: "notifications", bg: "#FDCB6E", angle: 315, radius: 95 },
];

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: radius * Math.cos(angleRad),
    y: radius * Math.sin(angleRad),
  };
}

export default function WelcomeBoard({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.orbitWrap}>
        <View style={[styles.ring, styles.ringOuter]} />
        <View style={[styles.ring, styles.ringInner]} />

        {RING_ICONS.map((item, i) => {
          const { x, y } = polarToCartesian(item.angle, item.radius);
          return (
            <View
              key={i}
              style={[
                styles.iconBadge,
                { backgroundColor: item.bg, transform: [{ translateX: x }, { translateY: y }] },
              ]}
            >
              <Ionicons name={item.name} size={16} color="#fff" />
            </View>
          );
        })}

        <View style={styles.centerBadge}>
          <Ionicons name="add" size={30} color="#fff" />
        </View>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>Welcome to asklepios{"\n"}UI Kit!</Text>
        <Text style={styles.subtitle}>
          We bring all of your health information together on one app, with the power of AI
        </Text>
      </View>

      <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("OnboardingSlides")}>
        <Text style={styles.primaryBtnText}>Get Started</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </Pressable>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Sign in</Text>
        </Pressable>
      </View>

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const CENTER_SIZE = 64;
const BADGE_SIZE = 34;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
  },
  orbitWrap: {
    width: 230,
    height: 230,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  ring: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
  },
  ringOuter: {
    width: 220,
    height: 220,
  },
  ringInner: {
    width: 150,
    height: 150,
  },
  iconBadge: {
    position: "absolute",
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  centerBadge: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    alignItems: "center",
    marginTop: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 12,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  primaryBtn: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 54,
    borderRadius: 16,
    marginTop: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  footerRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  homeIndicator: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginTop: 12,
  },
});