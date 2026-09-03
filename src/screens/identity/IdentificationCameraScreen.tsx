import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "IdentificationCamera"
>;

export default function IdentificationCameraScreen({
  navigation,
}: Props) {
  const [permission, requestPermission] =
    useCameraPermissions();

  const [cameraReady, setCameraReady] =
    useState(false);

  const [scanning, setScanning] =
    useState(false);

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            Checking camera permission...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>

          <View style={styles.permissionIcon}>
            <Ionicons
              name="camera-outline"
              size={30}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.permissionTitle}>
            Camera Access Required
          </Text>

          <Text style={styles.permissionDescription}>
            We need access to your camera to scan
            your identification document.
          </Text>

          <Pressable
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>
              Allow Camera
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.backText}>
              Go back
            </Text>
          </Pressable>

        </View>
      </SafeAreaView>
    );
  }

  const handleScan = async () => {
    if (!cameraReady || scanning) {
      return;
    }

    setScanning(true);

    /*
     * At this stage we are simulating the
     * identification upload/verification.
     *
     * Later we can connect this to your
     * actual identity verification API.
     */

    setTimeout(() => {
      navigation.replace(
        "IdentityVerification",
      );

      setScanning(false);
    }, 1000);
  };

  return (
    <View style={styles.cameraContainer}>

      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onCameraReady={() =>
          setCameraReady(true)
        }
      />

      {/* DARK OVERLAY */}

      <View style={styles.overlay} />

      <SafeAreaView
        style={styles.safeArea}
      >

        {/* TOP */}

        <View style={styles.topBar}>

          <Pressable
            style={styles.closeButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color="#FFFFFF"
            />
          </Pressable>

          <View style={styles.infoBadge}>
            <Ionicons
              name="scan-outline"
              size={12}
              color="#FFFFFF"
            />

            <Text style={styles.infoText}>
              Position your ID
            </Text>
          </View>

          <View style={styles.topSpacer} />

        </View>

        {/* INSTRUCTION */}

        <View style={styles.instructionContainer}>

          <Text style={styles.instructionTitle}>
            Position your identification
          </Text>

          <Text style={styles.instructionText}>
            Place your ID or passport inside the frame
          </Text>

        </View>

        {/* SCAN FRAME */}

        <View style={styles.frameContainer}>

          <View
            style={[
              styles.corner,
              styles.cornerTopLeft,
            ]}
          />

          <View
            style={[
              styles.corner,
              styles.cornerTopRight,
            ]}
          />

          <View
            style={[
              styles.corner,
              styles.cornerBottomLeft,
            ]}
          />

          <View
            style={[
              styles.corner,
              styles.cornerBottomRight,
            ]}
          />

          {/* SCAN LINE */}

          {scanning && (
            <View style={styles.scanLine} />
          )}

        </View>

        {/* BOTTOM */}

        <View style={styles.bottomContainer}>

          <Text style={styles.bottomText}>
            Make sure all 4 edges are visible
          </Text>

          <Pressable
            style={[
              styles.captureButton,
              !cameraReady &&
                styles.captureDisabled,
            ]}
            disabled={!cameraReady}
            onPress={handleScan}
          >
            <View style={styles.captureInner}>
              <Ionicons
                name="scan"
                size={24}
                color="#344054"
              />
            </View>
          </Pressable>

          <Text style={styles.captureText}>
            {scanning
              ? "Scanning..."
              : "Tap to scan"}
          </Text>

        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },

  safeArea: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      "rgba(2,8,23,0.28)",
  },

  /* TOP */

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 10,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor:
      "rgba(2,8,23,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor:
      "rgba(2,8,23,0.65)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  infoText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },

  topSpacer: {
    width: 38,
  },

  /* INSTRUCTION */

  instructionContainer: {
    alignItems: "center",
    marginTop: 45,
  },

  instructionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  instructionText: {
    color: "#E4E7EC",
    fontSize: 11,
    marginTop: 7,
    textAlign: "center",
  },
  container:{
    flex: 1,
    

  },

  /* FRAME */

  frameContainer: {
    width: "82%",
    height: 235,
    alignSelf: "center",
    marginTop: 35,
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 38,
    height: 38,
    borderColor: "#FFFFFF",
  },

  cornerTopLeft: {
    left: 0,
    top: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
  },

  cornerTopRight: {
    right: 0,
    top: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },

  cornerBottomLeft: {
    left: 0,
    bottom: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 10,
  },

  cornerBottomRight: {
    right: 0,
    bottom: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 10,
  },

  scanLine: {
    position: "absolute",
    left: 5,
    right: 5,
    top: "50%",
    height: 2,
    backgroundColor: "#2F80ED",
  },

  /* BOTTOM */

  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 28,
  },

  bottomText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginBottom: 18,
  },

  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  captureDisabled: {
    opacity: 0.5,
  },

  captureInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D0D5DD",
  },

  captureText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 9,
  },

  /* PERMISSION */

  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  permissionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  permissionTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
    textAlign: "center",
  },

  permissionDescription: {
    color: "#98A2B3",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  permissionText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  permissionButton: {
    width: "100%",
    height: 45,
    borderRadius: 9,
    backgroundColor: "#2864E8",
    alignItems: "center",
    justifyContent: "center",
  },

  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  backButton: {
    marginTop: 15,
    padding: 8,
  },

  backText: {
    color: "#2864E8",
    fontSize: 12,
    fontWeight: "600",
  },
});