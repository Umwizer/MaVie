import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import { useForm, Controller } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";

import { colors } from "../../constants/theme";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

type FormValues = {
  email: string;
  password: string;
};

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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: FormValues) => {
    setAuthError(null);
    setSubmitting(true);

    try {
      await signIn(email, password);

      navigation.navigate("OnboardingReady");
    } catch (e: any) {
      setAuthError(e.message || "Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* HEADER */}

            <View style={styles.header}>
              <View style={styles.logoDot}>
                <Ionicons
                  name="heart"
                  size={20}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.brand}>MaVie</Text>

              <Text style={styles.subtitle}>
                Sign in to access your all-in-one intelligent health experience
              </Text>
            </View>

            {/* ERROR */}

            {authError && (
              <View style={styles.errorBanner}>
                <Ionicons
                  name="alert-circle"
                  size={18}
                  color="#FFFFFF"
                />

                <Text style={styles.errorText}>
                  {authError}
                </Text>
              </View>
            )}

            {/* EMAIL */}

            <Text style={styles.label}>
              Email Address
            </Text>

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputContainer,
                    errors.email && styles.inputError,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.textSecondary}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </View>
              )}
            />

            {errors.email && (
              <Text style={styles.fieldError}>
                {errors.email.message}
              </Text>
            )}

            {/* PASSWORD */}

            <Text style={styles.label}>
              Password
            </Text>

            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputContainer,
                    errors.password && styles.inputError,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={colors.textSecondary}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />

                  <Pressable
                    onPress={() =>
                      setShowPassword((current) => !current)
                    }
                    hitSlop={10}
                  >
                    <Ionicons
                      name={
                        showPassword
                          ? "eye-off-outline"
                          : "eye-outline"
                      }
                      size={21}
                      color={colors.textSecondary}
                    />
                  </Pressable>
                </View>
              )}
            />

            {errors.password && (
              <Text style={styles.fieldError}>
                {errors.password.message}
              </Text>
            )}

            {/* REMEMBER / FORGOT PASSWORD */}

            <View style={styles.optionsRow}>
              <View style={styles.rememberRow}>
                <Switch
                  value={keepSignedIn}
                  onValueChange={setKeepSignedIn}
                  trackColor={{
                    false: "#767577",
                    true: colors.primary,
                  }}
                  thumbColor="#FFFFFF"
                />

                <Text style={styles.rememberText}>
                  Keep me signed in
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate("ForgotPasswordMethod")
                }
              >
                <Text style={styles.link}>
                  Forgot Password?
                </Text>
              </Pressable>
            </View>

            {/* SIGN IN */}

            <Pressable
              style={[
                styles.primaryBtn,
                submitting && styles.primaryBtnDisabled,
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={submitting}
            >
              <Text style={styles.primaryBtnText}>
                {submitting ? "Signing In..." : "Sign In"}
              </Text>

              {!submitting && (
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#FFFFFF"
                />
              )}
            </Pressable>

            {/* OR */}

            <View style={styles.orContainer}>
              <View style={styles.line} />

              <Text style={styles.orText}>
                OR
              </Text>

              <View style={styles.line} />
            </View>

            {/* GOOGLE - DISABLED TEMPORARILY */}

            <Pressable
              style={[
                styles.googleBtn,
                styles.googleBtnDisabled,
              ]}
              disabled
            >
              <Ionicons
                name="logo-google"
                size={20}
                color={colors.textSecondary}
              />

              <Text style={styles.googleBtnDisabledText}>
                Continue with Google
              </Text>
            </Pressable>

            {/* SIGN UP */}

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>
                Don't have an account?
              </Text>

              <Pressable
                onPress={() => navigation.navigate("signUp")}
              >
                <Text style={styles.signupLink}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoDot: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  brand: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },

  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 21,
  },

  /* ERROR */

  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.error,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
  },

  errorText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 8,
  },

  /* FORM */

  label: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },

  inputContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    marginLeft: 10,
  },

  inputError: {
    borderColor: colors.error,
  },

  fieldError: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
  },

  /* OPTIONS */

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rememberText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 7,
  },

  link: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  /* PRIMARY BUTTON */

  primaryBtn: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    marginTop: 26,
    gap: 8,
  },

  primaryBtnDisabled: {
    opacity: 0.6,
  },

  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* OR */

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  orText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 14,
  },

  /* GOOGLE */

  googleBtn: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    gap: 10,
  },

  googleBtnDisabled: {
    opacity: 0.45,
  },

  googleBtnDisabledText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "600",
  },

  /* FOOTER */

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    gap: 5,
  },

  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  signupLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});