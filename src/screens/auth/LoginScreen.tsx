import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../constants/theme";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
type FormValues = { email: string; password: string };

export default function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    setAuthError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch (e: any) {
      setAuthError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoDot} />
        <Text style={styles.brand}>MaVie</Text>
        <Text style={styles.subtitle}>Sign in to access all-in-one intelligent health</Text>
      </View>

      {authError && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle" size={16} color="#fff" />
          <Text style={styles.errorText}>ERROR: {authError}</Text>
        </View>
      )}

      <Text style={styles.label}>Email Address</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email address..."
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.email && <Text style={styles.fieldError}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <View style={[styles.passwordRow, errors.password && styles.inputError]}>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Pressable onPress={() => setShowPassword((s) => !s)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={colors.textSecondary} />
        </Pressable>
      </View>
      {errors.password && <Text style={styles.fieldError}>{errors.password.message}</Text>}

      <View style={styles.row}>
        <View style={styles.rememberRow}>
          <Switch value={keepSignedIn} onValueChange={setKeepSignedIn} />
          <Text style={styles.rememberText}>Keep me signed in.</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("ForgotPasswordMethod")}>
          <Text style={styles.link}>Forgot Password</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.primaryBtn, submitting && styles.primaryBtnDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={submitting}
      >
        <Text style={styles.primaryBtnText}>{submitting ? "Signing In..." : "Sign In →"}</Text>
      </Pressable>

      <Text style={styles.orText}>or</Text>

      <Pressable style={styles.googleBtn}>
        <Ionicons name="logo-google" size={18} color={colors.textPrimary} />
        <Text style={styles.googleBtnText}>Sign In With Google</Text>
      </Pressable>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24, paddingTop: 24 },
  header: { alignItems: "center", marginBottom: 24 },
  logoDot: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primary, marginBottom: 8 },
  brand: { color: colors.textPrimary, fontSize: 20, fontWeight: "700" },
  subtitle: { color: colors.textSecondary, fontSize: 13, marginTop: 4, textAlign: "center" },
  errorBanner: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.error, borderRadius: 10, padding: 10, marginBottom: 16 },
  errorText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  label: { color: colors.textSecondary, fontSize: 12, marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: colors.cardBackground, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border },
  inputError: { borderColor: colors.error },
  fieldError: { color: colors.error, fontSize: 12, marginTop: 4 },
  passwordRow: { flexDirection: "row", alignItems: "center", backgroundColor: colors.cardBackground, borderRadius: 12, paddingHorizontal: 14, borderWidth: 1, borderColor: colors.border },
  passwordInput: { flex: 1, paddingVertical: 12, color: colors.textPrimary },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  rememberRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  rememberText: { color: colors.textSecondary, fontSize: 12 },
  link: { color: colors.primary, fontSize: 12, fontWeight: "600" },
  primaryBtn: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 20 },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  orText: { color: colors.textSecondary, textAlign: "center", marginVertical: 12, fontSize: 12 },
  googleBtn: { flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingVertical: 14 },
  googleBtnText: { color: colors.textPrimary, fontWeight: "600" },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: colors.textSecondary, fontSize: 13 },
});