import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

const BADGES = [
  { name: "Hydration Pal", icon: "water" as const, color: "#8B5CF6" },
  { name: "Health God", icon: "medkit" as const, color: "#2F6FED" },
  { name: "Steps Master", icon: "footsteps" as const, color: "#F59E0B" },
];

export default function AchievementBadgesVisual() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {BADGES.map((b, i) => (
          <View
            key={b.name}
            style={[
              styles.badgeCard,
              { marginTop: i === 1 ? -16 : 16 } // staggered effect
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: `${b.color}33` }]}>
              <Ionicons name={b.icon} size={26} color={b.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.badgeName}>{b.name}</Text>
              <Text style={styles.badgeStatus}>Unlocked</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const CARD_WIDTH = 112; // w-28

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12, // if gap errors, add marginHorizontal: 6 to badgeCard
  },
  badgeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    gap: 12,
    width: CARD_WIDTH,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  badgeName: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  badgeStatus: {
    color: colors.textSecondary,
    fontSize: 10,
  },
});