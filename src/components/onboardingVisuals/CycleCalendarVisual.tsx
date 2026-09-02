import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/theme"; // adjust path

const HEADERS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKS = [
  [30, 31, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 1, 2, 3],
];
const HIGHLIGHT_KEYS = ["1-9", "3-25"]; // "weekIndex-day"

export default function CycleCalendarVisual() {
  return (
    <View style={styles.container}>
      <View style={styles.calendarCard}>
        {/* Headers */}
        <View style={styles.headerRow}>
          {HEADERS.map((h, i) => (
            <Text key={i} style={styles.headerText}>{h}</Text>
          ))}
        </View>

        {/* Weeks */}
        {WEEKS.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((day, di) => {
              const isHighlighted = HIGHLIGHT_KEYS.includes(`${wi}-${day}`);
              const isMuted = (wi === 0 && di < 2) || (wi === 4 && di > 3);

              return (
                <View key={di} style={styles.dayCell}>
                  <View style={[
                    styles.dayCircle,
                    isHighlighted && styles.dayCircleHighlighted
                  ]}>
                    <Text style={[
                      styles.dayText,
                      isMuted && styles.dayTextMuted,
                      isHighlighted && styles.dayTextHighlighted
                    ]}>
                      {day}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Floating Badge */}
      <View style={styles.floatingBadge}>
        <Text style={styles.badgeLabel}>Next period</Text>
        <Text style={styles.badgeValue}>27</Text>
      </View>
    </View>
  );
}

const CELL_SIZE = 32; // w-8 h-8

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarCard: {
    width: "100%",
    backgroundColor: colors.cardBackground,
    borderRadius: 28,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerText: {
    color: colors.textSecondary,
    fontSize: 12,
    width: CELL_SIZE,
    textAlign: "center",
    fontWeight: "600",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircleHighlighted: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  dayTextMuted: {
    color: colors.navInactive,
  },
  dayTextHighlighted: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  floatingBadge: {
    position: "absolute",
    bottom: -16,
    left: -16,
    backgroundColor: "#F43F5E",
    borderRadius: 48,
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },
  badgeValue: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
});