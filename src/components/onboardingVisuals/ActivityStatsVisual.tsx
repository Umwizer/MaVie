import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

const ACTIVITIES = [
  { name: "Jogging", icon: "walk" as const, intensity: "Intense", color: "#F43F5E", intensityIcon: "heart" as const },
  { name: "Cycling", icon: "bicycle" as const, intensity: "Light", color: "#F59E0B", intensityIcon: "heart" as const },
  { name: "Yoga", icon: "body" as const, intensity: "Relax", color: "#22C55E", intensityIcon: "leaf" as const },
  { name: "Swimming", icon: "water" as const, intensity: "Intense", color: "#F43F5E", intensityIcon: "heart" as const },
];

export default function ActivityStatsVisual() {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {ACTIVITIES.map((a) => (
          <View key={a.name} style={styles.card}>
            <Text style={styles.brandText}>asklepios</Text>
            <Ionicons name={a.icon} size={28} color="#FFFFFF" />
            <Text style={styles.activityName}>{a.name}</Text>
            <View style={styles.intensityRow}>
              <Ionicons name={a.intensityIcon} size={12} color={a.color} />
              <Text style={[styles.intensityText, { color: a.color }]}>{a.intensity}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12, // if gap errors, use marginBottom: 12 on card instead
  },
  card: {
    width: "47%", // w-[47%]
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12, // replaces mb-1 + gap fallback
  },
  brandText: {
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 12,
  },
  activityName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  intensityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // if gap errors, add marginRight: 4 to Ionicons
  },
  intensityText: {
    fontSize: 12,
    fontWeight: "500",
  },
});