import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "ProfileSetup">;

const STEPS = ["Account Info", "Personal Info", "Choose Plan"];

export default function ProfileSetupScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <StatusBar style="light" />

      <View className="mt-4 flex-row items-center">
        {STEPS.map((step, index) => {
          const isActive = index === 0;
          const isLast = index === STEPS.length - 1;

          return (
            <View key={step} className="flex-1 flex-row items-center">
              <View className="items-center">
                <View
                  className={`h-3.5 w-3.5 rounded-full ${
                    isActive ? "bg-primary" : "bg-card"
                  }`}
                />
                <Text
                  className={`absolute top-5 w-24 text-center text-[9px] ${
                    isActive ? "text-white" : "text-textSecondary"
                  }`}
                >
                  {step}
                </Text>
              </View>

              {!isLast && (
                <View className="mx-1 h-px flex-1 bg-progressTrack">
                  {index === 0 && <View className="h-px w-1/2 bg-primary" />}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="mb-9 h-20 w-20 items-center justify-center">
          <View className="absolute h-14 w-14 rounded-full bg-primary/20" />
          <Ionicons name="add" size={56} color="#2F6FED" />
        </View>

        <Text className="text-center text-[17px] font-semibold leading-6 text-white">
          Let&apos;s Set Up Your Profile{"\n"}&amp; Security
        </Text>
        <Text className="mt-5 max-w-[280px] text-center text-[11px] leading-4 text-textSecondary">
          Your health journey is very important, and we don&apos;t want it to
          be a mystery.
        </Text>
      </View>

      <View className="pb-5">
        <Pressable
          className="h-11 items-center justify-center rounded-lg bg-primary active:opacity-80"
          onPress={() => navigation.replace("ProfileDetails")}
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-xs font-semibold text-white">I&apos;m Ready</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </View>
        </Pressable>

        <Pressable
          className="mt-3 h-8 items-center justify-center active:opacity-70"
          onPress={() => navigation.replace("ProfileDetails")}
        >
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="calendar-outline" size={13} color="#2F6FED" />
            <Text className="text-xs font-medium text-primary">I&apos;ll do it later</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
