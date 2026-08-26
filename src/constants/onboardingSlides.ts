import type { Ionicons } from "@expo/vector-icons";

export type Slide = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

// Placeholder icons until you export real illustrations from Figma.
// Swap each `icon` value for an `image: require(...)` field later —
// see OnboardingScreen.tsx for how to switch back to images.
export const SLIDES: Slide[] = [
  { title: "Personalized Health That You Can Control", description: "Take control of your wellness journey with personalized insights.", icon: "bar-chart" },
  { title: "Get Your Daily Activity Suggestion", description: "Tailored tips to keep you active and energized.", icon: "walk" },
  { title: "A Health Metrics That Understands You.", description: "Insights designed around your unique and professional needs.", icon: "stats-chart" },
  { title: "World's Most Trusted Wellness Companion", description: "Empowering millions to live healthier lives and happier days, backed by our LLMs.", icon: "chatbubbles" },
  { title: "Access to 24/7 Virtual Care Is Here.", description: "Expert support whenever and wherever you need it, anytime.", icon: "videocam" },
  { title: "Track & Analyze Your Sleep Without Stress", description: "Smarter sleep insights for a more restful you. Track your sleep and get healthy.", icon: "moon" },
  { title: "Period Prediction & Cycle Tracking", description: "Stay in sync with your body, every day without any missed time.", icon: "calendar" },
  { title: "Daily Nutrition Insight & Recommendation", description: "Eat smarter, live better with personalized advice tailored for you.", icon: "nutrition" },
  { title: "Smart Medication Management", description: "Never miss a dose of your medication with intuitive tracking tools.", icon: "medkit" },
  { title: "AI-Powered Symptom Checker", description: "Quick, accurate insights for peace of mind based on our AI/LLMs.", icon: "pulse" },
  { title: "Explore Health Achievements", description: "Celebrate milestones and stay motivated, every single day!", icon: "trophy" },
];