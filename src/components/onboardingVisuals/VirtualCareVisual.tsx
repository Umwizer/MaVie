import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

export default function VirtualCareVisual() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>Dr. Hannah Lector</Text>
        <Text style={styles.title}>Certified Psychiatrist</Text>

        <View style={styles.avatarBox}>
          <Ionicons name="person" size={72} color="#3A4256" />
        </View>

        {/* Call Button */}
        <View style={styles.callButton}>
          <Ionicons name="call" size={22} color="#FFFFFF" />
        </View>

        {/* Book Badge */}
        <View style={styles.bookBadge}>
          <Ionicons name="hand-left" size={14} color="#FFFFFF" />
          <Text style={styles.bookBadgeText}>One Tap Book</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 260,
    backgroundColor: colors.cardBackground,
    borderRadius: 32,
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  name: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  title: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 16,
  },
  avatarBox: {
    width: "100%",
    height: 192, // h-48
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  callButton: {
    position: "absolute",
    left: -16,
    top: 64, // top-16
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  bookBadge: {
    position: "absolute",
    right: -24,
    bottom: 56, // bottom-14
    backgroundColor: "#22C55E",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // if gap errors, add marginRight to Ionicons
  },
  bookBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});