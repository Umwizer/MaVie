import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

const RESULTS = [
  { name: "Tension Headache", match: 80, risk: "High Risk", riskColor: "#F43F5E", barColor: "#F43F5E", icon: "person" as const, iconBg: "#4C1D2E" },
  { name: "Influenza Type A", match: 80, risk: "Mild Risk", riskColor: "#F59E0B", barColor: "#F59E0B", icon: "medkit" as const, iconBg: "#4A2E12" },
];

export default function SymptomCheckerVisual() {
  return (
    <View style={styles.container}>
      {RESULTS.map((r) => (
        <View key={r.name} style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={[styles.iconCircle, { backgroundColor: r.iconBg }]}>
                <Ionicons name={r.icon} size={18} color={r.barColor} />
              </View>
              <Text style={styles.conditionName}>{r.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#9AA3B2" />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${r.match}%`, backgroundColor: r.barColor }]} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.matchRow}>
              <Ionicons name="sparkles" size={12} color="#9AA3B2" />
              <Text style={styles.matchText}>{r.match}% Match</Text>
            </View>
            <View style={styles.riskRow}>
              <View style={[styles.riskDot, { backgroundColor: r.riskColor }]} />
              <Text style={[styles.riskText, { color: r.riskColor }]}>{r.risk}</Text>
            </View>
          </View>
          <Text style={styles.suggestionText}>2 suggestion • Treatable</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    gap: 12, // if gap errors, add marginBottom: 12 to card
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // if gap errors, add marginRight: 12 to iconCircle
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  conditionName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  progressTrack: {
    height: 6,
    borderRadius: 8,
    backgroundColor: "#1E2740",
    marginBottom: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  matchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  matchText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  riskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  riskText: {
    fontSize: 12,
    fontWeight: "500",
  },
  suggestionText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});