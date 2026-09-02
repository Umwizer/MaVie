import React, { useEffect, useState } from "react";
import { View,Text,TextInput,Pressable,StyleSheet,Switch,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider,signInWithCredential,} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../constants/theme";
import type { RootStackParamList } from "../../navigation/types";
WebBrowser.maybeCompleteAuthSession();


type Props = NativeStackScreenProps<RootStackParamList,"Login">;
type FormValues = { email: string; password: string; };


export default function LoginScreen({
  navigation,
}: Props) {
  const { signIn } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [keepSignedIn, setKeepSignedIn] =
    useState(true);

  const [authError, setAuthError] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [
    request,
    response,
    promptAsync,
  ] = Google.useIdTokenAuthRequest({
    webClientId:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,

    androidClientId:
      process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,

    iosClientId:
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,

    selectAccount: true,
  });

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

  const onSubmit = async ({
    email,
    password,
  }: FormValues) => {
    setAuthError(null);

    setSubmitting(true);

    try {
      await signIn(email, password);

      navigation.navigate("OnboardingReady");

    } catch (e: any) {
      setAuthError(
        e.message || "Unable to sign in."
      );

    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      if (response?.type !== "success") {
        return;
      }

      try {
        setAuthError(null);

        const idToken =
          response.params?.id_token;

        if (!idToken) {
          throw new Error(
            "Google did not return an ID token."
          );
        }


        // Create Firebase credential
        const credential =
          GoogleAuthProvider.credential(idToken);


        // Sign into Firebase
        await signInWithCredential(
          auth,
          credential
        );


        // Navigate after successful login
        navigation.navigate("OnboardingReady");

      } catch (error: any) {
        console.error(
          "Google Sign-In Error:",
          error
        );

        setAuthError(
          error.message ||
            "Google sign-in failed. Please try again."
        );

      } finally {
        setGoogleLoading(false);
      }
    };

    handleGoogleSignIn();

  }, [response, navigation]);


  const handleGoogleLogin = async () => {
    try {
      setAuthError(null);

      setGoogleLoading(true);

      const result = await promptAsync();

      // If user cancels
      if (
        result.type === "cancel" ||
        result.type === "dismiss"
      ) {
        setGoogleLoading(false);
      }

    } catch (error: any) {
      console.error(
        "Google authentication error:",
        error
      );

      setAuthError(
        error.message ||
          "Unable to start Google sign-in."
      );

      setGoogleLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}

      <View style={styles.header}>

        <View style={styles.logoDot} />

        <Text style={styles.brand}>
          MaVie
        </Text>

        <Text style={styles.subtitle}>
          Sign in to access all-in-one intelligent health
        </Text>

      </View>


      {/* ================= ERROR ================= */}

      {authError && (
        <View style={styles.errorBanner}>

          <Ionicons
            name="alert-circle"
            size={16}
            color="#FFFFFF"
          />

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
            required: "Password is required",
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
              secureTextEntry={!showPassword}
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
        >
          <Ionicons
            name={
              showPassword
                ? "eye-off"
                : "eye"
            }
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>

      </View>

      {errors.password && (
        <Text style={styles.fieldError}>
          {errors.password.message}
        </Text>
      )}


      {/* ================= REMEMBER + FORGOT ================= */}

      <View style={styles.row}>

        <View style={styles.rememberRow}>

          <Switch
            value={keepSignedIn}
            onValueChange={setKeepSignedIn}
          />

          <Text style={styles.rememberText}>
            Keep me signed in.
          </Text>

        </View>


        <Pressable
          onPress={() =>
            navigation.navigate(
              "ForgotPasswordMethod"
            )
          }
        >
          <Text style={styles.link}>
            Forgot Password
          </Text>
        </Pressable>

      </View>


      {/* ================= SIGN IN BUTTON ================= */}

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
            ? "Signing In..."
            : "Sign In →"}
        </Text>
      </Pressable>



      <Text style={styles.orText}>
        or
      </Text>


      <Pressable
        style={[
          styles.googleBtn,

          googleLoading &&
            styles.googleBtnDisabled,

          !request &&
            styles.googleBtnDisabled,
        ]}
        onPress={handleGoogleLogin}
        disabled={
          googleLoading || !request
        }
      >

        <Ionicons
          name="logo-google"
          size={18}
          color={colors.textPrimary}
        />

        <Text style={styles.googleBtnText}>
          {googleLoading
            ? "Connecting to Google..."
            : "Continue with Google"}
        </Text>

      </Pressable>

      <View style={styles.footerRow}>

        <Text style={styles.footerText}>
          Don't have an account?
        </Text>

        <Pressable
          onPress={() =>
            navigation.navigate("signUp")
          }
        >
          <Text style={styles.link}>
            Sign Up
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      colors.background,

    paddingHorizontal: 24,

    paddingTop: 24,
  },


  header: {
    alignItems: "center",

    marginBottom: 24,
  },


  logoDot: {
    width: 40,
    height: 40,

    borderRadius: 12,

    backgroundColor:
      colors.primary,

    marginBottom: 8,
  },


  brand: {
    color: colors.textPrimary,

    fontSize: 20,

    fontWeight: "700",
  },


  subtitle: {
    color: colors.textSecondary,

    fontSize: 13,

    marginTop: 4,

    textAlign: "center",
  },


  errorBanner: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    backgroundColor:
      colors.error,

    borderRadius: 10,

    padding: 10,

    marginBottom: 16,
  },


  errorText: {
    color: "#FFFFFF",

    fontSize: 13,

    fontWeight: "600",

    flex: 1,
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


  inputError: {
    borderColor:
      colors.error,
  },


  fieldError: {
    color: colors.error,

    fontSize: 12,

    marginTop: 4,
  },


  passwordRow: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor:
      colors.cardBackground,

    borderRadius: 12,

    paddingHorizontal: 14,

    borderWidth: 1,

    borderColor: colors.border,
  },


  passwordInput: {
    flex: 1,

    paddingVertical: 12,

    color: colors.textPrimary,
  },


  row: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginTop: 12,
  },


  rememberRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,
  },


  rememberText: {
    color: colors.textSecondary,

    fontSize: 12,
  },


  link: {
    color: colors.primary,

    fontSize: 12,

    fontWeight: "600",
  },


  primaryBtn: {
    backgroundColor:
      colors.primary,

    borderRadius: 14,

    paddingVertical: 14,

    alignItems: "center",

    marginTop: 20,
  },


  primaryBtnDisabled: {
    opacity: 0.6,
  },


  primaryBtnText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 15,
  },


  orText: {
    color: colors.textSecondary,

    textAlign: "center",

    marginVertical: 12,

    fontSize: 12,
  },



  googleBtn: {
    flexDirection: "row",

    gap: 8,

    alignItems: "center",

    justifyContent: "center",

    borderWidth: 1,

    borderColor: colors.border,

    borderRadius: 14,

    paddingVertical: 14,
  },


  googleBtnDisabled: {
    opacity: 0.5,
  },


  googleBtnText: {
    color: colors.textPrimary,

    fontWeight: "600",

    fontSize: 14,
  },



  footerRow: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 5,

    marginTop: 24,
  },


  footerText: {
    color: colors.textSecondary,

    fontSize: 13,
  },

});