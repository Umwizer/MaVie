import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";
import { colors } from "../../constants/theme";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "signUp">;

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

/*
 * Calculate password strength
 */
function getStrength(password: string) {
  let score = 0;

  if (password.length >= 8) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  if (score <= 1) {
    return {
      label: "Weak",
      score: 1,
      color: "#EF4444",
    };
  }

  if (score === 2) {
    return {
      label: "Add Strength",
      score: 2,
      color: "#F59E0B",
    };
  }

  if (score === 3) {
    return {
      label: "Good",
      score: 3,
      color: "#3B82F6",
    };
  }

  return {
    label: "Amazing",
    score: 4,
    color: "#22C55E",
  };
}

export default function SignUpScreen({ navigation }: Props) {
  const { signUp } = useAuth();

  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /*
   * React Hook Form
   */
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",

    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /*
   * Get current password
   */
  const password = watch("password");

  /*
   * Calculate password strength
   */
  const strength = useMemo(
    () => getStrength(password || ""),
    [password]
  );

  /*
   * Submit signup form
   */
  const onSubmit = async ({
    email,
    password,
  }: FormValues) => {
    setAuthError(null);
    setSubmitting(true);

    try {
      /*
       * Create Firebase account
       */
      await signUp(email, password);

      /*
       * Signup successful.
       *
       * Go to Login instead of OnboardingReady.
       */
      navigation.navigate("Login");
    } catch (e: any) {
      console.error("Signup error:", e);

      setAuthError(
        e?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoDot} />

        <Text style={styles.brand}>
          MaVie
        </Text>
      </View>

      {/* Firebase error */}
      {authError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>
            {authError}
          </Text>
        </View>
      )}

      {/* ================= EMAIL ================= */}

      <Text style={styles.label}>
        Email Address
      </Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",

          pattern: {
            value:
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

            message:
              "Enter a valid email address",
          },
        }}
        render={({
          field: {
            onChange,
            onBlur,
            value,
          },
        }) => (
          <TextInput
            style={[
              styles.input,
              errors.email &&
                styles.inputError,
            ]}
            placeholder="Enter your email address..."
            placeholderTextColor={
              colors.textSecondary
            }
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />

      {errors.email && (
        <Text style={styles.fieldError}>
          {errors.email.message}
        </Text>
      )}

      {/* ================= PASSWORD ================= */}

      <Text style={styles.label}>
        Password
      </Text>

      <View
        style={[
          styles.passwordRow,
          errors.password &&
            styles.inputError,
        ]}
      >
        <Controller
          control={control}
          name="password"
          rules={{
            required:
              "Password is required",

            minLength: {
              value: 8,
              message:
                "Password must be at least 8 characters",
            },
          }}
          render={({
            field: {
              onChange,
              onBlur,
              value,
            },
          }) => (
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor={
                colors.textSecondary
              }
              secureTextEntry={
                !showPassword
              }
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Pressable
          onPress={() =>
            setShowPassword(
              (current) => !current
            )
          }
          style={styles.eyeButton}
        >
          <Ionicons
            name={
              showPassword
                ? "eye-off"
                : "eye"
            }
            size={20}
            color={
              colors.textSecondary
            }
          />
        </Pressable>
      </View>

      {errors.password && (
        <Text style={styles.fieldError}>
          {errors.password.message}
        </Text>
      )}

      {/* Password strength */}

      {!!password && !errors.password && (
        <View style={styles.strengthRow}>
          <View
            style={styles.strengthTrack}
          >
            <View
              style={[
                styles.strengthFill,
                {
                  width: `${
                    strength.score * 25
                  }%`,
                  backgroundColor:
                    strength.color,
                },
              ]}
            />
          </View>

          <Text
            style={[
              styles.strengthLabel,
              {
                color: strength.color,
              },
            ]}
          >
            Password strength:{" "}
            {strength.label}
          </Text>
        </View>
      )}

      {/* ================= CONFIRM PASSWORD ================= */}

      <Text style={styles.label}>
        Confirm Password
      </Text>

      <View
        style={[
          styles.passwordRow,
          errors.confirmPassword &&
            styles.inputError,
        ]}
      >
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required:
              "Please confirm your password",

            validate: (value) =>
              value === password ||
              "Passwords do not match",
          }}
          render={({
            field: {
              onChange,
              onBlur,
              value,
            },
          }) => (
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor={
                colors.textSecondary
              }
              secureTextEntry={
                !showConfirmPassword
              }
              autoCapitalize="none"
              autoCorrect={false}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Pressable
          onPress={() =>
            setShowConfirmPassword(
              (current) => !current
            )
          }
          style={styles.eyeButton}
        >
          <Ionicons
            name={
              showConfirmPassword
                ? "eye-off"
                : "eye"
            }
            size={20}
            color={
              colors.textSecondary
            }
          />
        </Pressable>
      </View>

      {errors.confirmPassword && (
        <Text style={styles.fieldError}>
          {
            errors.confirmPassword
              .message
          }
        </Text>
      )}

      {/* ================= SIGN UP BUTTON ================= */}

      <Pressable
        style={[
          styles.primaryBtn,
          submitting &&
            styles.primaryBtnDisabled,
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={submitting}
      >
        <Text style={styles.primaryBtnText}>
          {submitting
            ? "Signing Up..."
            : "Sign Up →"}
        </Text>
      </Pressable>

      {/* ================= LOGIN LINK ================= */}

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          I already have an account?{" "}
        </Text>

        <Pressable
          onPress={() =>
            navigation.navigate("Login")
          }
        >
          <Text style={styles.link}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoDot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginBottom: 8,
  },

  brand: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
  },

  errorBanner: {
    backgroundColor: colors.error,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },

  errorText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  label: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor:
      colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  passwordInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
  },

  eyeButton: {
    paddingLeft: 10,
  },

  inputError: {
    borderColor: colors.error,
  },

  fieldError: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },

  strengthRow: {
    marginTop: 8,
    gap: 4,
  },

  strengthTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor:
      colors.progressTrack,
    overflow: "hidden",
  },

  strengthFill: {
    height: "100%",
  },

  strengthLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },

  primaryBtnDisabled: {
    opacity: 0.6,
  },

  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  footerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },

  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
});
