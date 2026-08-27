import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../Context/AuthContext";
import { useTheme } from "../../Context/ThemeContext";

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", gap: 16 }}>
      <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Signed in as {user?.email}</Text>
      <Pressable onPress={() => signOut()}>
        <Text style={{ color: colors.primary, fontWeight: "600" }}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}