import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext"
import { colors } from "../../constants/theme";

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoDot} />
        <Text style={styles.brand}>MaVie</Text>
      </View>

      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={48} color={colors.primary} />
        <Text style={styles.title}>You're signed in</Text>
        <Text style={styles.subtitle}>
          {user?.email ? `Signed in as ${user.email}` : "This is a placeholder home screen."}
        </Text>
        <Text style={styles.hint}>Replace HomeScreen with your real app content when it's ready.</Text>
      </View>

      <Pressable style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24, paddingTop: 24 },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoDot: { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.primary },
  brand: { color: colors.textPrimary, fontSize: 18, fontWeight: "700" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 24 },
  title: { color: colors.textPrimary, fontSize: 20, fontWeight: "700", marginTop: 8 },
  subtitle: { color: colors.textSecondary, fontSize: 14, textAlign: "center" },
  hint: { color: colors.textSecondary, fontSize: 12, textAlign: "center", marginTop: 12, opacity: 0.7 },
  signOutBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  signOutText: { color: colors.error, fontWeight: "600" },
});