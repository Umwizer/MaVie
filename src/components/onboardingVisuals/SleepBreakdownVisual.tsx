import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/theme"; // adjust path

const DOTS_FILLED = 8;
const DOTS_TOTAL = 14;

const STAGES = [
  { label: "Awake", pct: 11, time: "32m", color: "#F43F5E" },
  { label: "Post", pct: 18, time: "1h 3m", color: "#60A5FA" },
  { label: "Deep", pct: 21, time: "2h 33m", color: "#2F6FED" },
  { label: "Core", pct: 32, time: "3h 20m", color: "#3A4470" },
];

export default function SleepBreakdownVisual() {
  return (
    <View style={styles.container}>
      {/* Sleep Duration Card */}
      <View style={styles.card}>
        <Text style={styles.hoursText}>
          9.1 <Text style={styles.hourUnit}>hour</Text>
        </Text>
        
        <View style={styles.dotsContainer}>
          {Array.from({ length: DOTS_TOTAL }).map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                i < DOTS_FILLED ? styles.dotFilled : styles.dotEmpty
              ]} 
            />
          ))}
        </View>
        
        <Text style={styles.helperText}>Be sure to log your sleep metrics everyday!</Text>
      </View>

      {/* Stages Card */}
      <View style={styles.stagesCard}>
        {STAGES.map((s) => (
          <View key={s.label} style={styles.stageRow}>
            <View style={[styles.pctBadge, { backgroundColor: s.color }]}>
              <Text style={styles.pctText}>{s.pct}%</Text>
            </View>
            <Text style={styles.stageLabel}>{s.label}</Text>
            <Text style={styles.stageTime}>{s.time}</Text>
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
    gap: 12, // if gap errors, use marginBottom: 12 on card
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
  },
  hoursText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  hourUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textPrimary,
  },
  dotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
    marginBottom: 6, // this replaces gap-1.5
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  dotEmpty: {
    backgroundColor: "#1E2740",
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  stagesCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 12, // if gap errors, add marginBottom: 12 to stageRow except last
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // if gap errors, add marginRight: 12 to pctBadge
  },
  pctBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pctText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  stageLabel: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
  },
  stageTime: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});