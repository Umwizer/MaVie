export type Sender = "user" | "assistant";
export type CardType = "activity" | "meal" | "chart" | "none";
export interface ActivityCardData {
  type: "activity";
  title: string;
  durationMin: number;
  calories: number;
  distanceKm?: number;
  icon?: string;
}
export interface MealCardData {
  type: "meal";
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
}
export interface ChartCardData {
  type: "chart";
  title: string;
  unit: string;
  values: number[];
  labels: string[];
  average?: number;
}

export type CardData = ActivityCardData | MealCardData | ChartCardData;

export interface ChatMessage {
  id: string;
  sender: Sender;
  text?: string;
  card?: CardData;
  timestamp: number;
}
