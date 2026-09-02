import { Ionicons } from "@expo/vector-icons";
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

type Props = NativeStackScreenProps<RootStackParamList, "ChooseAvatar">;

const avatars = ["#B8A8C0","#B89C7D","#F04D4D","#5B5A82","#4E815A","#D4A52D",
  "#9BC5E2","#B8A8C0","#4F8D96","#A08C7B","#7EA784","#C06A9B",
];

export default function ChooseAvatarScreen({ navigation }: Props) {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const changeAvatar = (direction: number) => {
    setAvatarIndex((current) => {
      const nextIndex =
        (current + direction + avatars.length) % avatars.length;

      setSelectedAvatar(nextIndex);
      return nextIndex;
    });
  };

  const visibleAvatarIndexes = [
    (avatarIndex + avatars.length - 1) % avatars.length,
    avatarIndex,
    (avatarIndex + 1) % avatars.length,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.skipButton}
        onPress={() => navigation.navigate("#")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.title}>Choose Avatars</Text>

        <Ionicons name="caret-down" size={18} color="#2F6FED" />

        <View style={styles.avatarRow}>
          {visibleAvatarIndexes.map((index, position) => {
            const isSelected = index === selectedAvatar;

            return (
              <Pressable
                key={`${index}-${position}`}
                style={[
                  styles.avatarButton,
                  {
                    width: isSelected ? 112 : 68,
                    height: isSelected ? 112 : 68,
                    borderRadius: isSelected ? 56 : 34,
                    borderWidth: isSelected ? 2 : 0,
                    opacity: isSelected ? 1 : 0.55,
                    backgroundColor: avatars[index],
                  },
                ]}
                onPress={() => {
                  setSelectedAvatar(index);
                  setAvatarIndex(index);
                }}
                accessibilityLabel={`Select avatar ${index + 1}`}
              >
                <AvatarArtwork index={index} large={isSelected} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.navigationButtons}>
          <Pressable
            onPress={() => changeAvatar(-1)}
            accessibilityLabel="Previous avatars"
            hitSlop={10}
          >
            <Ionicons name="caret-back" size={18} color="#2F6FED" />
          </Pressable>

          <Pressable
            onPress={() => changeAvatar(1)}
            accessibilityLabel="Next avatars"
            hitSlop={10}
          >
            <Ionicons name="caret-forward" size={18} color="#2F6FED" />
          </Pressable>
        </View>

        <Text style={styles.counter}>
          {avatarIndex + 1} of {avatars.length}
        </Text>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.continueButton}
          onPress={() => navigation.navigate("OnboardingSlides")}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.continueText}>Continue</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("ProfileDetails")}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="arrow-back" size={13} color="#2F6FED" />
            <Text style={styles.backText}>Go Back</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function AvatarArtwork({
  index,
  large,
}: {
  index: number;
  large: boolean;
}) {
  const scale = large ? 1 : 0.6;

  const skinColors = ["#8D5524", "#F1C27D", "#C68642", "#FFDBAC"];
  const shirtColors = ["#2F6FED", "#E94B4B", "#20A39E", "#6C4AB6"];

  return (
    <View
      style={{
        width: 78 * scale,
        height: 88 * scale,
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 8 * scale,
          width: 42 * scale,
          height: 42 * scale,
          borderRadius: 21 * scale,
          backgroundColor: skinColors[index % skinColors.length],
          borderWidth: 2 * scale,
          borderColor: "#17213B",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -3 * scale,
            left: 1 * scale,
            width: 40 * scale,
            height: 15 * scale,
            borderTopLeftRadius: 20 * scale,
            borderTopRightRadius: 20 * scale,
            backgroundColor: "#17213B",
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 22 * scale,
            left: 10 * scale,
            width: 5 * scale,
            height: 5 * scale,
            borderRadius: 3 * scale,
            backgroundColor: "#17213B",
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 22 * scale,
            right: 10 * scale,
            width: 5 * scale,
            height: 5 * scale,
            borderRadius: 3 * scale,
            backgroundColor: "#17213B",
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: 72 * scale,
          height: 42 * scale,
          borderTopLeftRadius: 36 * scale,
          borderTopRightRadius: 36 * scale,
          backgroundColor: shirtColors[index % shirtColors.length],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Replace with your background color
    paddingHorizontal: 20,
  },

  skipButton: {
    position: "absolute",
    top: 16,
    right: 20,
    zIndex: 10,
    padding: 8,
  },

  skipText: {
    fontSize: 14,
    color: "#2F6FED",
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 56,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },

  avatarRow: {
    width: "100%",
    height: 128,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  avatarButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
    borderColor: "#2F6FED",
  },

  navigationButtons: {
    flexDirection: "row",
    gap: 40,
    marginTop: 12,
  },

  counter: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 14,
  },

  footer: {
    paddingBottom: 20,
  },

  continueButton: {
    height: 44,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#2F6FED",
  },

  backButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2F6FED",
    borderRadius: 8,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  backText: {
    color: "#2F6FED",
    fontSize: 14,
    fontWeight: "600",
  },
});
