import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";

const questions = [
  "What was the name of your elementary school?",
  "What is the official legal last name of your mother?",
  "What was the first name of your first pet you owned?",
];

export default function SecurityQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [answer, setAnswer] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* Question mark icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.questionSmall}>?</Text>
          <Text style={styles.questionLarge}>?</Text>
          <Text style={styles.questionGhost}>?</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Security Questions</Text>

        {/* Questions */}
        <View style={styles.questionsContainer}>
          {questions.map((question, index) => {
            const selected = selectedQuestion === index;

            return (
              <TouchableOpacity
                key={question}
                activeOpacity={0.8}
                onPress={() => setSelectedQuestion(index)}
                style={[
                  styles.questionBox,
                  selected && styles.questionBoxSelected,
                ]}
              >
                <Text
                  style={[
                    styles.questionText,
                    selected && styles.questionTextSelected,
                  ]}
                >
                  {question}
                </Text>

                <View
                  style={[
                    styles.radio,
                    selected && styles.radioSelected,
                  ]}
                >
                  {selected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Answer */}
        <Text style={styles.answerLabel}>Enter your answer</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>?</Text>

          <TextInput
            value={answer}
            onChangeText={setAnswer}
            placeholder="Verification"
            placeholderTextColor="#68718a"
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        {/* Continue */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.continueButton}
          onPress={() => console.log("Continue")}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020718",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 38,
  },

  // -------------------------
  // Icon
  // -------------------------

  iconContainer: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 4,
  },

  questionLarge: {
    position: "absolute",
    color: "#2D7BFF",
    fontSize: 43,
    fontWeight: "700",
    left: "44%",
    top: 13,
  },

  questionSmall: {
    position: "absolute",
    color: "#D8E8FF",
    fontSize: 38,
    fontWeight: "700",
    left: "50%",
    top: 0,
  },

  questionGhost: {
    position: "absolute",
    color: "#18243B",
    fontSize: 35,
    fontWeight: "700",
    left: "57%",
    top: 19,
  },

  // -------------------------
  // Title
  // -------------------------

  title: {
    color: "#F5F7FF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 22,
  },

  // -------------------------
  // Questions
  // -------------------------

  questionsContainer: {
    gap: 8,
  },

  questionBox: {
    minHeight: 51,
    borderRadius: 9,
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#17233A",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  questionBoxSelected: {
    backgroundColor: "#132D69",
    borderColor: "#246AFF",
  },

  questionText: {
    flex: 1,
    color: "#DCE2EF",
    fontSize: 9,
    lineHeight: 13,
    paddingRight: 8,
  },

  questionTextSelected: {
    color: "#397CFF",
  },

  // -------------------------
  // Radio
  // -------------------------

  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#020814",
    backgroundColor: "#020814",
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    backgroundColor: "#246AFF",
    borderColor: "#246AFF",
  },

  radioDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DCE8FF",
  },

  // -------------------------
  // Answer
  // -------------------------

  answerLabel: {
    color: "#F2F4FA",
    fontSize: 9,
    fontWeight: "500",
    marginTop: 18,
    marginBottom: 7,
  },

  inputContainer: {
    height: 35,
    borderRadius: 6,
    backgroundColor: "#111B2E",
    borderWidth: 1,
    borderColor: "#1D2941",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
  },

  inputIcon: {
    color: "#738099",
    fontSize: 13,
    marginRight: 5,
  },

  input: {
    flex: 1,
    height: "100%",
    color: "#E5E9F2",
    fontSize: 10,
  },

  // -------------------------
  // Button
  // -------------------------

  continueButton: {
    height: 38,
    borderRadius: 7,
    backgroundColor: "#2467E8",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  continueText: {
    color: "#EAF1FF",
    fontSize: 10,
    fontWeight: "600",
  },

  arrow: {
    color: "#EAF1FF",
    fontSize: 17,
    marginLeft: 7,
    marginTop: -1,
  },
});
