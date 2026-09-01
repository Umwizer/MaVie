import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme"; // adjust path

export default function ChatCompanionVisual() {
  return (
    <View style={styles.container}>
      {/* User Message */}
      <View style={[styles.bubble, styles.userBubble]}>
        <Text style={styles.userText}>Hi, how much water do I need to drink for today?</Text>
        <Text style={styles.userTime}>11:25</Text>
      </View>

      {/* AI Message */}
      <View style={styles.aiRow}>
        <View style={styles.avatar}>
          <Ionicons name="hardware-chip" size={16} color={colors.primary} />
        </View>
        <View style={[styles.bubble, styles.aiBubble]}>
          <Text style={styles.aiText}>You're currently at 4 glasses — you need 4 more for today! Let's drink!</Text>
          <Text style={styles.aiTime}>11:25</Text>
        </View>
      </View>

      {/* User Message */}
      <View style={[styles.bubble, styles.userBubble]}>
        <Text style={styles.userText}>Wow, amazing! Thank you!</Text>
        <Text style={styles.userTime}>11:25</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    gap: 12, // if gap errors, add marginBottom: 12 to aiRow and userBubble
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    maxWidth: "85%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderTopRightRadius: 4, // rounded-tr-sm
  },
  userText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  userTime: {
    color: "rgba(255,255,255,0.7)", // text-white/70
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
  aiRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    maxWidth: "90%",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  aiBubble: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 4, // rounded-tl-sm
    flex: 1,
  },
  aiText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  aiTime: {
    color: colors.textSecondary,
    fontSize: 10,
    textAlign: "right",
    marginTop: 4,
  },
});