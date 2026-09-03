import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ScanIdentification"
>;

export default function ScanIdentificationScreen({
  navigation,
}: Props) {
  const handleStartScan = () => {
    navigation.navigate("IdentificationCamera");
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>
            Scan Your Identification
          </Text>

          <Text style={styles.subtitle}>
            Let's take a pic of your ID or passport.
          </Text>
        </View>

        {/* IDENTIFICATION ILLUSTRATION */}

        <View style={styles.illustrationContainer}>

          {/* Background shape */}

          <View style={styles.backgroundShape} />

          {/* ID CARD */}

          <View style={styles.idCard}>

            <View style={styles.idPhoto}>
              <View style={styles.personHead} />
              <View style={styles.personBody} />
            </View>

            <View style={styles.idLines}>
              <View style={styles.idLineLarge} />
              <View style={styles.idLine} />
              <View style={styles.idLine} />
            </View>

            <View style={styles.idBottomLine} />

          </View>

          {/* HAND */}

          <View style={styles.hand}>
            <View style={styles.palm} />

            <View
              style={[
                styles.finger,
                styles.fingerOne,
              ]}
            />

            <View
              style={[
                styles.finger,
                styles.fingerTwo,
              ]}
            />

            <View
              style={[
                styles.finger,
                styles.fingerThree,
              ]}
            />
          </View>

        </View>

        {/* CHECKLIST */}

        <View style={styles.checkList}>

          <CheckItem text="Keep your identification clearly" />

          <CheckItem text="Make sure it's not blurry" />

          <CheckItem text="Place the 4 edges in sight" />

        </View>

        {/* BUTTON */}

        <Pressable
          style={styles.continueButton}
          onPress={handleStartScan}
        >
          <Text style={styles.continueText}>
            Got it, let's scan
          </Text>

          <Ionicons
            name="arrow-forward"
            size={15}
            color="#FFFFFF"
          />
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

function CheckItem({
  text,
}: {
  text: string;
}) {
  return (
    <View style={styles.checkItem}>

      <View style={styles.checkCircle}>
        <Ionicons
          name="checkmark"
          size={9}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.checkText}>
        {text}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020817",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 25,
  },

  header: {
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#98A2B3",
    fontSize: 11,
    marginTop: 7,
    textAlign: "center",
  },

  /* ILLUSTRATION */

  illustrationContainer: {
    height: 220,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  backgroundShape: {
    position: "absolute",
    width: 180,
    height: 130,
    borderRadius: 60,
    backgroundColor: "#17253A",
    transform: [
      {
        rotate: "-7deg",
      },
    ],
  },

  idCard: {
    width: 145,
    height: 95,
    borderRadius: 4,
    backgroundColor: "#AAB8C8",
    position: "absolute",
    top: 55,
    left: 58,
    padding: 8,
    flexDirection: "row",
  },

  idPhoto: {
    width: 42,
    height: 55,
    backgroundColor: "#E9EEF4",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  personHead: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF7184",
    marginBottom: 2,
  },

  personBody: {
    width: 30,
    height: 23,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#EF7184",
  },

  idLines: {
    flex: 1,
    marginLeft: 8,
    paddingTop: 4,
  },

  idLineLarge: {
    width: 45,
    height: 5,
    backgroundColor: "#E8EDF2",
    marginBottom: 8,
  },

  idLine: {
    width: 35,
    height: 3,
    backgroundColor: "#E8EDF2",
    marginBottom: 6,
  },

  idBottomLine: {
    position: "absolute",
    right: 8,
    bottom: 12,
    width: 18,
    height: 3,
    backgroundColor: "#E8EDF2",
  },

  /* HAND */

  hand: {
    position: "absolute",
    width: 95,
    height: 70,
    bottom: 17,
    right: 42,
  },

  palm: {
    position: "absolute",
    width: 55,
    height: 45,
    borderRadius: 24,
    backgroundColor: "#F59A9E",
    right: 18,
    bottom: 5,
    transform: [
      {
        rotate: "-20deg",
      },
    ],
  },

  finger: {
    position: "absolute",
    width: 17,
    height: 43,
    borderRadius: 10,
    backgroundColor: "#F59A9E",
  },

  fingerOne: {
    right: 55,
    bottom: 23,
    transform: [
      {
        rotate: "-55deg",
      },
    ],
  },

  fingerTwo: {
    right: 42,
    bottom: 27,
    transform: [
      {
        rotate: "-40deg",
      },
    ],
  },

  fingerThree: {
    right: 28,
    bottom: 29,
    transform: [
      {
        rotate: "-25deg",
      },
    ],
  },

  /* CHECKLIST */

  checkList: {
    marginTop: 10,
    marginBottom: 25,
  },

  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  checkCircle: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  checkText: {
    color: "#D0D5DD",
    fontSize: 10,
  },

  /* BUTTON */

  continueButton: {
    height: 42,
    borderRadius: 8,
    backgroundColor: "#2864E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});