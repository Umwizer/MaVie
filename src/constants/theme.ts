export type ThemeName = "light" | "dark";

export type ThemeColors = {
  background: string;
  cardBackground: string;
  primary: string;
  primaryLight: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  error: string;
  progressTrack: string;
  navInactive: string;
};

const dark: ThemeColors = {
  background: "#0B0F1A",
  cardBackground: "#141B2E",
  primary: "#2F6FED",
  primaryLight: "#7C9CFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#9AA3B2",
  border: "#242C40",
  error: "#EF4444",
  progressTrack: "#1E2740",
  navInactive: "#3A4256",
};

const light: ThemeColors = {
  background: "#FFFFFF",
  cardBackground: "#F5F6F8",
  primary: "#2F6FED",
  primaryLight: "#EAF0FF",
  textPrimary: "#0B0F1A",
  textSecondary: "#5B6472",
  border: "#E2E5EA",
  error: "#DC2626",
  progressTrack: "#E7E9EE",
  navInactive: "#C7CCD6",
};

export const themes: Record<ThemeName, ThemeColors> = { light, dark };
export const colors = dark;