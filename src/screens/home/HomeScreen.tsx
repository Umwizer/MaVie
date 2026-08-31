import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../constants/theme";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", gap: 16 }}>
      <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Signed in as {user?.email}</Text>
      <Pressable onPress={() => signOut()}><Text style={{ color: colors.primary, fontWeight: "600" }}>Sign Out</Text></Pressable>
    </SafeAreaView>
  );
}