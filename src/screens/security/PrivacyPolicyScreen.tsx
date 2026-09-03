import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";
import {
  fetchLanguages,
  translateText,
  type TranslationLanguage,
} from "../../services/translationApi";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PrivacyPolicy"
>;

type Colors = {
  background: string;
  card: string;
  selectedCard: string;
  border: string;
  text: string;
  secondaryText: string;
  bodyText: string;
  iconBackground: string;
};

const DARK_COLORS: Colors = {
  background: "#020817",
  card: "#0D1729",
  selectedCard: "#142A54",
  border: "#273244",
  text: "#FFFFFF",
  secondaryText: "#98A2B3",
  bodyText: "#F5F5F5",
  iconBackground: "#172338",
};

const LIGHT_COLORS: Colors = {
  background: "#F8FAFC",
  card: "#FFFFFF",
  selectedCard: "#EAF1FF",
  border: "#D0D5DD",
  text: "#101828",
  secondaryText: "#667085",
  bodyText: "#344054",
  iconBackground: "#F2F4F7",
};

/*
 * This is the original English policy.
 *
 * We keep ONLY the English source text here.
 * We do NOT manually create French, Kinyarwanda,
 * Spanish, etc.
 */
const PRIVACY_POLICY = {
  introduction:
    "Your privacy is important to us. This Privacy Policy explains how MaVie collects, uses, protects and manages your information.",

  section1Title: "1. Information We Collect",

  section1:
    "We may collect information that you provide when creating an account, completing your profile, using health and wellness features, or communicating with us.",

  section2Title: "2. How We Use Your Information",

  section2:
    "We use your information to provide and improve MaVie services, personalize your experience, maintain account security, and communicate important service information.",

  section3Title: "3. Data Security",

  section3:
    "We use appropriate technical and organizational measures to help protect your personal information against unauthorized access, alteration, disclosure or destruction.",

  section4Title: "4. Your Choices",

  section4:
    "You may have rights to access, correct, update or delete certain personal information associated with your account, subject to applicable law.",

  section5Title: "5. Contact Us",

  section5:
    "If you have questions about this Privacy Policy or how your information is handled, please contact the MaVie support team.",
};

const SOURCE_LANGUAGE = "en";

export default function PrivacyPolicyScreen({
  navigation,
}: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [languages, setLanguages] = useState<
    TranslationLanguage[]
  >([]);

  const [selectedLanguage, setSelectedLanguage] =
    useState<TranslationLanguage | null>(null);

  const [languageModalVisible, setLanguageModalVisible] =
    useState(false);

  const [loadingLanguages, setLoadingLanguages] =
    useState(true);

  const [translating, setTranslating] = useState(false);

  const [translatedPolicy, setTranslatedPolicy] = useState<
    typeof PRIVACY_POLICY
  >(PRIVACY_POLICY);

  const colors = isDarkMode
    ? DARK_COLORS
    : LIGHT_COLORS;

  const styles = useMemo(
    () => createStyles(colors),
    [colors]
  );

  /*
   * Load available languages when the screen opens.
   */
  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setLoadingLanguages(true);

      const result = await fetchLanguages();

      /*
       * Make sure English is selected by default.
       */
      const english =
        result.find(
          (language) =>
            language.code.toLowerCase() === "en"
        ) ?? result[0];

      setLanguages(result);
      setSelectedLanguage(english ?? null);
    } catch (error) {
      console.error(
        "Unable to load languages:",
        error
      );

      Alert.alert(
        "Languages unavailable",
        "We could not load the available languages. Please try again."
      );
    } finally {
      setLoadingLanguages(false);
    }
  };

  /*
   * Translate the entire policy.
   */
  const handleLanguageSelect = async (
    language: TranslationLanguage
  ) => {
    setLanguageModalVisible(false);

    if (
      selectedLanguage?.code === language.code
    ) {
      return;
    }

    try {
      setTranslating(true);

      const [
        introduction,
        section1Title,
        section1,
        section2Title,
        section2,
        section3Title,
        section3,
        section4Title,
        section4,
        section5Title,
        section5,
      ] = await Promise.all([
        translateText(
          PRIVACY_POLICY.introduction,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section1Title,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section1,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section2Title,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section2,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section3Title,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section3,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section4Title,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section4,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section5Title,
          SOURCE_LANGUAGE,
          language.code
        ),

        translateText(
          PRIVACY_POLICY.section5,
          SOURCE_LANGUAGE,
          language.code
        ),
      ]);

      setTranslatedPolicy({
        introduction,
        section1Title,
        section1,
        section2Title,
        section2,
        section3Title,
        section3,
        section4Title,
        section4,
        section5Title,
        section5,
      });

      setSelectedLanguage(language);
    } catch (error) {
      console.error(
        "Translation failed:",
        error
      );

      Alert.alert(
        "Translation failed",
        "We could not translate the Privacy Policy. Please try again."
      );
    } finally {
      setTranslating(false);
    }
  };

  /*
   * Reset back to English.
   */
  const handleEnglish = async () => {
    const english =
      languages.find(
        (language) =>
          language.code.toLowerCase() === "en"
      );

    if (!english) {
      return;
    }

    setTranslatedPolicy(PRIVACY_POLICY);
    setSelectedLanguage(english);
    setLanguageModalVisible(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.container}>
        {/* TOP ROW */}
        <View style={styles.topRow}>
          <View style={styles.plusCircle}>
            <FontAwesome
              name="plus"
              size={30}
              color="#2864E8"
            />
          </View>

          <Pressable
            style={styles.themeButton}
            onPress={() =>
              setIsDarkMode(
                (previous) => !previous
              )
            }
          >
            <Ionicons
              name={
                isDarkMode
                  ? "sunny-outline"
                  : "moon-outline"
              }
              size={18}
              color={
                isDarkMode
                  ? "#FFFFFF"
                  : "#101828"
              }
            />
          </Pressable>
        </View>

        {/* VERSION */}
        <View style={styles.holder}>
        <Text style={styles.version}>
          v1.0
        </Text>

        {/* TITLE */}
        <Text style={styles.title}>
          Privacy Policy
        </Text>
        <Text style={styles.effectiveDate}>
          Effective date: 23 Nov 2026
        </Text>

        {/* LANGUAGE */}
        <Pressable
          style={styles.languageButton}
          onPress={() =>
            setLanguageModalVisible(true)
          }
        >
          <Ionicons
            name="globe-outline"
            size={15}
            color={colors.text}
          />

          <Text style={styles.languageText}>
            {loadingLanguages
              ? "Loading languages..."
              : selectedLanguage
                ? selectedLanguage.name
                : "English"}
          </Text>

          <Ionicons
            name="chevron-down"
            size={14}
            color={colors.secondaryText}
          />
        </Pressable>

        {/* DOWNLOAD */}
        <Pressable
          style={styles.downloadButton}
        >
          <Text style={styles.downloadText}>
            ↓ Download PDF
          </Text>
        </Pressable>
        </View>

        {/* CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }
        >
          {translating && (
            <View style={styles.translationLoading}>
              <ActivityIndicator
                size="small"
                color="#2864E8"
              />

              <Text
                style={
                  styles.translationLoadingText
                }
              >
                Translating Privacy Policy...
              </Text>
            </View>
          )}

          <Text style={styles.bodyText}>
            {translatedPolicy.introduction}
          </Text>

          <Section
            title={translatedPolicy.section1Title}
            text={translatedPolicy.section1}
            styles={styles}
          />

          <Section
            title={translatedPolicy.section2Title}
            text={translatedPolicy.section2}
            styles={styles}
          />

          <Section
            title={translatedPolicy.section3Title}
            text={translatedPolicy.section3}
            styles={styles}
          />

          <Section
            title={translatedPolicy.section4Title}
            text={translatedPolicy.section4}
            styles={styles}
          />

          <Section
            title={translatedPolicy.section5Title}
            text={translatedPolicy.section5}
            styles={styles}
          />

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* BUTTONS */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.acceptButton}
            onPress={() =>
              navigation.navigate(
                "EnableNotifications"
              )
            }
          >
            <Text style={styles.acceptText}>
              Accept
            </Text>
          </Pressable>

          <Pressable
            style={styles.declineButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.declineText}>
              Decline
            </Text>
          </Pressable>
        </View>
      </View>

      {/* LANGUAGE MODAL */}
      <Modal
        visible={languageModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setLanguageModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.languageModal,
              {
                backgroundColor:
                  colors.card,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select Language
              </Text>

              <Pressable
                onPress={() =>
                  setLanguageModalVisible(
                    false
                  )
                }
              >
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.text}
                />
              </Pressable>
            </View>

            {loadingLanguages ? (
              <View
                style={
                  styles.modalLoading
                }
              >
                <ActivityIndicator
                  size="large"
                  color="#2864E8"
                />

                <Text
                  style={
                    styles.modalLoadingText
                  }
                >
                  Loading languages...
                </Text>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={
                  false
                }
              >
                {languages.map(
                  (language) => {
                    const selected =
                      selectedLanguage?.code ===
                      language.code;

                    return (
                      <Pressable
                        key={language.code}
                        style={[
                          styles.languageOption,
                          selected &&
                            styles.selectedLanguageOption,
                        ]}
                        onPress={() =>
                          handleLanguageSelect(
                            language
                          )
                        }
                      >
                        <View>
                          <Text
                            style={
                              styles.languageName
                            }
                          >
                            {language.name}
                          </Text>

                          <Text
                            style={
                              styles.languageCode
                            }
                          >
                            {language.code.toUpperCase()}
                          </Text>
                        </View>

                        {selected && (
                          <Ionicons
                            name="checkmark-circle"
                            size={22}
                            color="#2864E8"
                          />
                        )}
                      </Pressable>
                    );
                  }
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Section({
  title,
  text,
  styles,
}: {
  title: string;
  text: string;
  styles: ReturnType<
    typeof createStyles
  >;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Text style={styles.bodyText}>
        {text}
      </Text>
    </View>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },

    container: {
      flex: 1,
      paddingHorizontal: 20,
    },

    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
      position:"relative",
    },

    plusCircle: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
    },

    themeButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor:
        colors.iconBackground,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
  top: 10,
  right: 10,
    },
    holder:{
        alignItems: "center",
        justifyContent:"center",
        marginBottom: 20,

    

    },

    version: {
      color: colors.secondaryText,
      fontSize: 12,
      marginTop: 2,

    },

    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "700",
      marginTop: 5,
    },

    effectiveDate: {
      color: colors.secondaryText,
      fontSize: 13,
      marginTop: 5,
    },

    languageButton: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor:
        colors.card,
      borderWidth: 1,
      borderColor:
        colors.border,
      marginTop: 16,
    },

    languageText: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "500",
    },

    downloadButton: {
      alignSelf: "flex-start",
      marginTop: 12,
    },

    downloadText: {
      color: "#2864E8",
      fontSize: 13,
      fontWeight: "600",
    },

    scrollContent: {
      paddingTop: 18,
      paddingBottom: 30,
    },

    translationLoading: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 12,
      borderRadius: 10,
      backgroundColor:
        colors.card,
      marginBottom: 16,
    },

    translationLoadingText: {
      color: colors.secondaryText,
      fontSize: 13,
    },

    section: {
      marginTop: 22,
    },

    sectionTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 8,
    },

    bodyText: {
      color: colors.bodyText,
      fontSize: 14,
      lineHeight: 22,
    },

    bottomSpace: {
      height: 20,
    },

    buttonContainer: {
      paddingTop: 10,
      paddingBottom: 8,
      gap: 10,
    },

    acceptButton: {
      height: 52,
      borderRadius: 12,
      backgroundColor: "#2864E8",
      alignItems: "center",
      justifyContent: "center",
    },

    acceptText: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "700",
    },

    declineButton: {
      height: 48,
      borderRadius: 12,
      backgroundColor: "#3A1015",
      alignItems: "center",
      justifyContent: "center",
    },

    declineText: {
      color: "#FF5C67",
      fontSize: 15,
      fontWeight: "700",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor:
        "rgba(0,0,0,0.65)",
      justifyContent: "flex-end",
    },

    languageModal: {
      maxHeight: "80%",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
    },

    modalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18,
    },

    modalTitle: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "700",
    },

    modalLoading: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 50,
    },

    modalLoadingText: {
      color: colors.secondaryText,
      marginTop: 12,
      fontSize: 14,
    },

    languageOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingVertical: 14,
      borderRadius: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },

    selectedLanguageOption: {
      backgroundColor:
        colors.selectedCard,
      borderColor: "#2864E8",
    },

    languageName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "600",
    },

    languageCode: {
      color: colors.secondaryText,
      fontSize: 11,
      marginTop: 3,
    },
  });
}