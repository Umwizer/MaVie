import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

export default function MedicationListVisual() {
  return (
    <View style={styles.container}>
      {/* Skipped Medication */}
      <View style={styles.cardRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="shapes-outline" size={20} color="#9AA3B2" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.medName}>Atorvaliq (atorvastatin)</Text>
          <Text style={styles.medDetail}>3 tablets • Before Eating</Text>
          <View style={styles.statusRow}>
            <Ionicons name="close-circle" size={14} color="#F43F5E" />
            <Text style={[styles.statusText, { color: "#F43F5E" }]}>Skipped</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#9AA3B2" />
      </View>

      {/* Actionable Medication */}
      <View style={styles.cardColumn}>
        <View style={styles.cardRowInner}>
          <View style={styles.iconCircle}>
            <Ionicons name="ellipse-outline" size={20} color="#9AA3B2" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.medName}>Amoxiciline</Text>
            <Text style={[styles.medTime, { color: colors.primary }]}>1 tablet at 12:22 am</Text>
            <Text style={styles.medDetail}>65mg • After Meal</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={[styles.button, styles.buttonSecondary]}>
            <Text style={styles.buttonTextSecondary}>Skipped</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonTextPrimary}>Taken</Text>
          </Pressable>
        </View>
      </View>

      {/* Taken Medication */}
      <View style={styles.cardRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="ellipse" size={20} color="#9AA3B2" />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.medName}>Ibuprofen</Text>
          <Text style={styles.medDetail}>8 pills • Before Eating</Text>
          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
            <Text style={[styles.statusText, { color: "#22C55E" }]}>Taken</Text>
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
    gap: 12, // if gap errors, add marginBottom: 12 to cardRow/cardColumn
  },
  cardRow: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardColumn: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  cardRowInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1E2740",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
  },
  medName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  medDetail: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  medTime: {
    fontSize: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  button: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#1E2740",
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonTextSecondary: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
});