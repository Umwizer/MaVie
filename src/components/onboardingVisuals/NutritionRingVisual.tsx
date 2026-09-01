import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

const MACROS = [
  { label: "Carb", value: "35/77g", color: "#F59E0B", pct: 0.45 },
  { label: "Fiber", value: "35/77g", color: "#22C55E", pct: 0.45 },
  { label: "Fat", value: "35/77g", color: "#F43F5E", pct: 0.45 },
];

export default function NutritionRingVisual() {
  return (
    <View style={styles.container}>
      {/* Top Stats Card */}
      <View style={styles.statsCard}>
        {/* Consumed */}
        <View style={styles.statColumn}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.statValue}>656</Text>
          <Text style={styles.statLabel}>Consumed</Text>
        </View>

        {/* Ring */}
        <View style={styles.ring}>
          <View style={styles.ringProgress} />
          <Text style={styles.ringValue}>584</Text>
          <Text style={styles.ringLabel}>Remaining</Text>
        </View>

        {/* Target */}
        <View style={styles.statColumn}>
          <Ionicons name="locate" size={20} color="#9AA3B2" />
          <Text style={styles.statValue}>1220</Text>
          <Text style={styles.statLabel}>Target</Text>
        </View>
      </View>

      {/* Macros Card */}
      <View style={styles.macrosCard}>
        {MACROS.map((m) => (
          <View key={m.label} style={styles.macroColumn}>
            <Text style={styles.macroLabel}>{m.label}</Text>
            <View style={styles.macroTrack}>
              <View style={[styles.macroFill, { width: `${m.pct * 100}%`, backgroundColor: m.color }]} />
            </View>
            <Text style={styles.macroValue}>{m.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const RING_SIZE = 112; // w-28 h-28

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    gap: 12, // if gap errors, add marginBottom: 12 to statsCard
  },
  statsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statColumn: {
    alignItems: "center",
    gap: 8, // if gap errors, add marginBottom to children
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1E2740",
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 4,
    borderColor: "#1E2740",
    alignItems: "center",
    justifyContent: "center",
  },
  ringProgress: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 4,
    borderColor: colors.primary,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    transform: [{ rotate: "45deg" }],
  },
  ringValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },
  ringLabel: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  macrosCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroColumn: {
    alignItems: "center",
    flex: 1,
  },
  macroLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  macroTrack: {
    width: "100%",
    height: 6,
    borderRadius: 8,
    backgroundColor: "#1E2740",
    marginBottom: 8,
    overflow: "hidden",
  },
  macroFill: {
    height: "100%",
    borderRadius: 8,
  },
  macroValue: {
    color: colors.textPrimary,
    fontSize: 11,
  },
});