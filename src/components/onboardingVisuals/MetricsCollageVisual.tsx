import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const HEART_WAVE = [0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 0.3];
const WATER_BARS = [0.9, 0.6, 0.7, 0.5, 0.8, 0.4, 0.6];
const SLEEP_LOGGED = [true, false, true, true, false, true, false];

export default function MetricsCollageVisual() {
  return (
    <View style={styles.container}>
      {/* Heart Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="heart" size={20} color="#F43F5E" />
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Today</Text>
            <Ionicons name="chevron-forward" size={12} color="#9AA3B2" />
          </View>
        </View>
        <View style={styles.cardBody}>
          <View>
            <Text style={styles.valueText}>
              72<Text style={styles.unitText}> bpm</Text>
            </Text>
            <Text style={styles.subText}>Resting Rate</Text>
          </View>
          <View style={styles.waveContainer}>
            {HEART_WAVE.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.waveBar,
                  {
                    height: 36 * h,
                    opacity: 0.5 + h * 0.5,
                    backgroundColor: "#F43F5E"
                  }
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Sleep Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="moon" size={20} color="#8B5CF6" />
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Today</Text>
            <Ionicons name="chevron-forward" size={12} color="#9AA3B2" />
          </View>
        </View>
        <Text style={styles.valueText}>
          8.2<Text style={styles.unitText}> hr</Text>
        </Text>
        <Text style={styles.subText}>Well-rested</Text>
        <View style={styles.sleepRow}>
          {SLEEP_LOGGED.map((logged, i) => (
            <View key={i} style={styles.dayColumn}>
              <View style={[
                styles.dayDot,
                { backgroundColor: logged? "#8B5CF6" : "#1E2740" }
              ]}>
                {logged && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
              <Text style={styles.dayLabel}>{DAYS[i]}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Water Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="water" size={20} color={colors.primary} />
          <View style={styles.headerRight}>
            <Text style={styles.headerText}>Today</Text>
            <Ionicons name="chevron-forward" size={12} color="#9AA3B2" />
          </View>
        </View>
        <View style={styles.cardBody}>
          <View>
            <Text style={styles.valueText}>
              2,125<Text style={styles.unitText}> ml</Text>
            </Text>
            <Text style={styles.subText}>On Track</Text>
          </View>
          <View style={styles.waterBarContainer}>
            {WATER_BARS.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.waterBar,
                  {
                    height: 36 * h,
                    backgroundColor: colors.primary
                  }
                ]}
              />
            ))}
          </View>
        </View>
      </View>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, // if gap errors, add marginRight: 4 to headerText
  },
  headerText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  valueText: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  unitText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textPrimary,
  },
  subText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  waveContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 40,
    gap: 4,
  },
  waveBar: {
    width: 4,
    borderRadius: 8,
  },
  waterBarContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 40,
    gap: 6,
  },
  waterBar: {
    width: 6,
    borderRadius: 8,
  },
  sleepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayColumn: {
    alignItems: "center",
    gap: 4,
  },
  dayDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dayLabel: {
    color: colors.navInactive,
    fontSize: 10,
  },
});