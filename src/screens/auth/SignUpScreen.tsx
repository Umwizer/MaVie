import { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../constants/theme";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;
type FormValues = { email: string; password: string; confirmPassword: string };

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { label: "Weak", score: 1, color: "#EF4444" };
  if (score === 2) return { label: "Add Strength", score: 2, color: "#F59E0B" };
  if (score === 3) return { label: "Good", score: 3, color: "#3B82F6" };
  return { label: "Amazing", score: 4, color: "#22C55E" };
}

export default function SignupScreen({ navigation }: Props) {
  const { signUp } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");
  const strength = useMemo(() => getStrength(password || ""), [password]);

  const onSubmit = async ({ email, password }: FormValues) => {
    setAuthError(null);
    setSubmitting(true);
    try {
      await signUp(email, password);
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
      </View>

      {authError && <View style={styles.errorBanner}><Text style={styles.errorText}>ERROR: {authError}</Text></View>}

      <Text style={styles.label}>Email Address</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, errors.email && styles.inputError]} placeholder="Enter your email address..." placeholderTextColor={colors.textSecondary} autoCapitalize="none" keyboardType="email-address" value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      {errors.email && <Text style={styles.fieldError}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required", minLength: { value: 8, message: "Use at least 8 characters" } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, errors.password && styles.inputError]} placeholder="••••••••" placeholderTextColor={colors.textSecondary} secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      {errors.password && <Text style={styles.fieldError}>{errors.password.message}</Text>}
      {!!password && !errors.password && (
        <View style={styles.strengthRow}>
          <View style={styles.strengthTrack}><View style={[styles.strengthFill, { width: `${strength.score * 25}%`, backgroundColor: strength.color }]} /></View>
          <Text style={[styles.strengthLabel, { color: strength.color }]}>Password strength: {strength.label}</Text>
        </View>
      )}

      <Text style={styles.label}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{ required: "Please confirm your password", validate: (v) => v === password || "Passwords do not match" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, errors.confirmPassword && styles.inputError]} placeholder="••••••••" placeholderTextColor={colors.textSecondary} secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} />
        )}
      />
      {errors.confirmPassword && <Text style={styles.fieldError}>{errors.confirmPassword.message}</Text>}

      <Pressable style={[styles.primaryBtn, submitting && styles.primaryBtnDisabled]} onPress={handleSubmit(onSubmit)} disabled={submitting}>
        <Text style={styles.primaryBtnText}>{submitting ? "Signing Up..." : "Sign Up →"}</Text>
      </Pressable>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>I already have an account? </Text>
        <Pressable onPress={() => navigation.navigate("Login")}><Text style={styles.link}>Sign In</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24, paddingTop: 24 },
  header: { alignItems: "center", marginBottom: 20 },
  logoDot: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primary, marginBottom: 8 },
  brand: { color: colors.textPrimary, fontSize: 20, fontWeight: "700" },
  errorBanner: { backgroundColor: colors.error, borderRadius: 10, padding: 10, marginBottom: 16 },
  errorText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  label: { color: colors.textSecondary, fontSize: 12, marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: colors.cardBackground, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: colors.textPrimary, borderWidth: 1, borderColor: colors.border },
  inputError: { borderColor: colors.error },
  fieldError: { color: colors.error, fontSize: 12, marginTop: 4 },
  strengthRow: { marginTop: 8, gap: 4 },
  strengthTrack: { height: 4, borderRadius: 2, backgroundColor: colors.progressTrack, overflow: "hidden" },
  strengthFill: { height: "100%" },
  strengthLabel: { fontSize: 12, fontWeight: "600" },
  primaryBtn: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 24 },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: colors.textSecondary, fontSize: 13 },
  link: { color: colors.primary, fontSize: 13, fontWeight: "600" },
});