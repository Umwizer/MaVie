import AchievementBadgesVisual from "../components/onboardingVisuals/AchievementBadgesVisual";
import ActivityStatsVisual from "../components/onboardingVisuals/ActivityStatsVisual";
import ChatCompanionVisual from "../components/onboardingVisuals/ChatCompanionVisual";
import CycleCalendarVisual from "../components/onboardingVisuals/CycleCalendarVisual";
import HealthScoreVisual from "../components/onboardingVisuals/HealthScoreVisual";
import MedicationListVisual from "../components/onboardingVisuals/MedicationListVisual";
import MetricsCollageVisual from "../components/onboardingVisuals/MetricsCollageVisual";
import NutritionRingVisual from "../components/onboardingVisuals/NutritionRingVisual";
import SleepBreakdownVisual from "../components/onboardingVisuals/SleepBreakdownVisual";
import SymptomCheckerVisual from "../components/onboardingVisuals/SymptomCheckerVisual";
import VirtualCareVisual from "../components/onboardingVisuals/VirtualCareVisual";
import { ComponentType } from "react";
import { ViewProps } from "react-native";

export type Slide = {
  title: string;
  description: string;
  Visual: ComponentType<ViewProps>; // ADD THIS
};

export const SLIDES: Slide[] = [
  { 
    title: "Personalized Health That You Can Control", 
    description: "Take control of your wellness journey with personalized insights.",
    Visual: HealthScoreVisual
  },
  { 
    title: "Get Your Daily Activity Suggestion", 
    description: "Tailored tips to keep you active and energized.",
    Visual: ActivityStatsVisual
  },
  { 
    title: "A Health Metrics That Understands You.", 
    description: "Insights designed around your unique and professional needs.",
    Visual: MetricsCollageVisual
  },
  { 
    title: "World's Most Trusted Wellness Companion", 
    description: "Empowering millions to live healthier lives and happier days, backed by our LLMs.",
    Visual: ChatCompanionVisual
  },
  { 
    title: "Access to 24/7 Virtual Care Is Here.", 
    description: "Expert support whenever and wherever you need it, anytime.",
    Visual: VirtualCareVisual
  },
  { 
    title: "Track & Analyze Your Sleep Without Stress", 
    description: "Smarter sleep insights for a more restful you. Track your sleep and get healthy.",
    Visual: SleepBreakdownVisual
  },
  { 
    title: "Period Prediction & Cycle Tracking", 
    description: "Stay in sync with your body, every day without any missed time.",
    Visual: CycleCalendarVisual
  },
  { 
    title: "Daily Nutrition Insight & Recommendation", 
    description: "Eat smarter, live better with personalized advice tailored for you.",
    Visual: NutritionRingVisual
  },
  { 
    title: "Smart Medication Management", 
    description: "Never miss a dose of your medication with intuitive tracking tools.",
    Visual: MedicationListVisual
  },
  { 
    title: "AI-Powered Symptom Checker", 
    description: "Quick, accurate insights for peace of mind based on our AI/LLMs.",
    Visual: SymptomCheckerVisual
  },
  { 
    title: "Explore Health Achievements", 
    description: "Celebrate milestones and stay motivated, every single day!",
    Visual: AchievementBadgesVisual
  },
];