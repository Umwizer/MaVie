import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ChooseAvatar">;

export default function ChooseAvatarScreen({ navigation }: Props) {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const avatars = [
    "#B8A8C0", "#B89C7D", "#F04D4D", "#5B5A82", "#4E815A",
    "#D4A52D", "#9BC5E2", "#B8A8C0", "#4F8D96", "#A08C7B",
    "#7EA784", "#C06A9B",
  ];

  const changeAvatar = (direction: number) => {
    setAvatarIndex((current) => {
      const nextIndex = (current + direction + avatars.length) % avatars.length;
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
    <SafeAreaView className="flex-1 bg-background px-5">
      <Pressable
        className="absolute right-5 top-4 z-10 p-2"
        onPress={() => navigation.navigate("Onboarding")}
      >
        <Text className="text-[14px] text-primary">Skip</Text>
      </Pressable>
      <View className="flex-1 items-center pt-14">
        <Text className="text-center text-[20px] font-semibold text-white">
          Choose Avatars
        </Text>
        <Ionicons name="caret-down" size={18} color="#2F6FED" />

        <View className="mt-7 h-32 w-full flex-row items-center justify-center gap-3">
          {visibleAvatarIndexes.map((index, position) => {
            const isSelected = index === selectedAvatar;
            return (
              <Pressable
                key={`${index}-${position}`}
                style={{
                  width: isSelected ? 112 : 68,
                  height: isSelected ? 112 : 68,
                  borderRadius: isSelected ? 56 : 34,
                  borderWidth: isSelected ? 2 : 0,
                  borderColor: "#2F6FED",
                  backgroundColor: avatars[index],
                  opacity: isSelected ? 1 : 0.55,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  overflow: "hidden",
                }}
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

        <View className="mt-3 flex-row gap-10">
          <Pressable onPress={() => changeAvatar(-1)} accessibilityLabel="Previous avatars">
            <Ionicons name="caret-back" size={18} color="#2F6FED" />
          </Pressable>
          <Pressable onPress={() => changeAvatar(1)} accessibilityLabel="Next avatars">
            <Ionicons name="caret-forward" size={18} color="#2F6FED" />
          </Pressable>
        </View>
        <Text className="mt-3 text-[14px] text-white">
          {avatarIndex + 1} of {avatars.length}
        </Text>
      </View>

      <View className="pb-5">
        <Pressable
          className="mb-3 h-11 items-center justify-center rounded-lg bg-primary"
          onPress={() => navigation.navigate("SecurityQuestions",)}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-[14px] font-semibold text-white">Continue</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </Pressable>
        <Pressable
          className="h-10 items-center justify-center rounded-lg border border-primary"
          onPress={() => navigation.navigate("ProfileDetails")}
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="arrow-back" size={13} color="#2F6FED" />
            <Text className="text-[14px] font-semibold text-primary">Go Back</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function AvatarArtwork({ index, large }: { index: number; large: boolean }) {
  const scale = large ? 1 : 0.6;
  const skinColors = ["#8D5524", "#F1C27D", "#C68642", "#FFDBAC"];
  const shirtColors = ["#2F6FED", "#E94B4B", "#20A39E", "#6C4AB6"];

  return (
    <View style={{ width: 78 * scale, height: 88 * scale, alignItems: "center" }}>
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
