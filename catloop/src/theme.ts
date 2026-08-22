export const colors = {
  bg: "#0B0713",
  bgElevated: "#160E24",
  card: "#1E1330",
  cardBorder: "#2E2044",
  primary: "#B15CFF",
  primaryDeep: "#7A2BF5",
  accent: "#FF7AC6",
  mint: "#4BE1C4",
  text: "#F5EEFF",
  textDim: "#B7A9D0",
  textFaint: "#7C6E97",
  danger: "#FF5C7A",
  success: "#43D9A3",
  white: "#FFFFFF",
  overlay: "rgba(11,7,19,0.72)",
};

export const gradients: [string, string][] = [
  ["#7A2BF5", "#FF7AC6"],
  ["#4BE1C4", "#7A2BF5"],
  ["#FF7AC6", "#FFB35C"],
  ["#5C8CFF", "#B15CFF"],
  ["#FF5C7A", "#FFB35C"],
  ["#43D9A3", "#5C8CFF"],
];

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 34,
  pill: 999,
};

export const spacing = (n: number) => n * 4;

export const font = {
  brand: "Fredoka_600SemiBold",
  brandBold: "Fredoka_700Bold",
  heading: "Inter_700Bold",
  semi: "Inter_600SemiBold",
  body: "Inter_400Regular",
  medium: "Inter_500Medium",
};

export function gradientForSeed(seed: number): [string, string] {
  return gradients[seed % gradients.length];
}
