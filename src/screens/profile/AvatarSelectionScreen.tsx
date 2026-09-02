import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AvatarSelection"
>;

const AVATAR_OPTIONS = [
  { id: 0, emoji: "👨", label: "Male" },
  { id: 1, emoji: "👩", label: "Female" },
  { id: 2, emoji: "🧑", label: "Other" },
  { id: 3, emoji: "😊", label: "Friendly" },
  { id: 4, emoji: "🤗", label: "Happy" },
  { id: 5, emoji: "😎", label: "Cool" },
];

export default function AvatarSelectionScreen({
  navigation,
}: Props) {
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const selected = AVATAR_OPTIONS[selectedAvatar];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={8}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Choose Your Avatar
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.preview}>
          <Text style={styles.previewEmoji}>
            {selected.emoji}
          </Text>

          <Text style={styles.previewLabel}>
            {selected.label}
          </Text>
        </View>

        <View style={styles.avatarGrid}>
          {AVATAR_OPTIONS.map((avatar) => (
            <Pressable
              key={avatar.id}
              onPress={() =>
                setSelectedAvatar(avatar.id)
              }
              style={[
                styles.avatarButton,
                selectedAvatar === avatar.id &&
                  styles.selectedAvatar,
              ]}
            >
              <Text style={styles.avatarEmoji}>
                {avatar.emoji}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("ChooseAvatar")
        }
        style={styles.continueButton}
      >
        <Text style={styles.continueText}>
          Continue →
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#10182C",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  headerTitle: {
    marginLeft: 16,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  preview: {
    alignItems: "center",
    marginBottom: 32,
  },

  previewEmoji: {
    marginBottom: 16,
    fontSize: 60,
  },

  previewLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    maxWidth: 300,
  },

  avatarButton: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36,
    backgroundColor: "#18233B",
  },

  selectedAvatar: {
    backgroundColor: "#2F80ED",
  },

  avatarEmoji: {
    fontSize: 36,
  },

  continueButton: {
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: "#2F80ED",
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
