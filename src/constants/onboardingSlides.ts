import type { Ionicons } from "@expo/vector-icons";

export type Slide = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  caption: string;
};

export const SLIDES: Slide[] = [
  { title: "Personalized Health That You Can Control", description: "Take control of your wellness journey with personalized insights.", icon: "bar-chart", accent: "#2F6FED", caption: "Your score, trends, and goals in one glance." },
  { title: "Get Your Daily Activity Suggestion", description: "Tailored tips to keep you active and energized.", icon: "walk", accent: "#22C55E", caption: "Smart suggestions that adjust to your day." },
  { title: "A Health Metrics That Understands You.", description: "Insights designed around your unique and professional needs.", icon: "stats-chart", accent: "#F59E0B", caption: "Metrics tailored to your body, not averages." },
  { title: "World's Most Trusted Wellness Companion", description: "Empowering millions to live healthier lives and happier days, backed by our LLMs.", icon: "chatbubbles", accent: "#8B5CF6", caption: "Trusted by millions, powered by AI." },
  { title: "Access to 24/7 Virtual Care Is Here.", description: "Expert support whenever and wherever you need it, anytime.", icon: "videocam", accent: "#EC4899", caption: "Talk to a doctor, day or night." },
  { title: "Track & Analyze Your Sleep Without Stress", description: "Smarter sleep insights for a more restful you. Track your sleep and get healthy.", icon: "moon", accent: "#6366F1", caption: "Deeper insight into every night's rest." },
  { title: "Period Prediction & Cycle Tracking", description: "Stay in sync with your body, every day without any missed time.", icon: "calendar", accent: "#F43F5E", caption: "Predictions that adapt as you log more." },
  { title: "Daily Nutrition Insight & Recommendation", description: "Eat smarter, live better with personalized advice tailored for you.", icon: "nutrition", accent: "#10B981", caption: "Meals and macros made simple." },
  { title: "Smart Medication Management", description: "Never miss a dose of your medication with intuitive tracking tools.", icon: "medkit", accent: "#3B82F6", caption: "Reminders that actually fit your routine." },
  { title: "AI-Powered Symptom Checker", description: "Quick, accurate insights for peace of mind based on our AI/LLMs.", icon: "pulse", accent: "#EF4444", caption: "Answers in seconds, not endless searching." },
  { title: "Explore Health Achievements", description: "Celebrate milestones and stay motivated, every single day!", icon: "trophy", accent: "#EAB308", caption: "Every streak and milestone, celebrated." },
];