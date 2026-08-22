// Catloop Design Constitution — tokens are the single source of truth.
// 5 UI colors (+ blush for mascot anatomy only). Any 6th UI color is drift.

export const colors = {
  ember: "#EA580C", // primary brand: CTAs, active states, icon bg
  emberDark: "#C2410C", // pressed states, deep accents, gradient shadow stop
  paper: "#FFF7ED", // base background — warm, never white
  ink: "#1F2937", // all body text and line art — never pure black
  gold: "#F59E0B", // secondary accent: premium/pricing signaling, used sparingly
  blush: "#FDA4AF", // mascot anatomy ONLY (inner ears, nose) — never UI chrome

  // Derived, still traceable to the tokens above:
  surface: "#FFFFFF", // white-adjacent card surface sitting on paper
  border: "rgba(31,41,55,0.08)", // ink @ 8%
  inkDim: "rgba(31,41,55,0.65)", // caption / secondary text = ink @ 65%
  inkFaint: "rgba(31,41,55,0.45)",
  white: "#FFFFFF",
  scrim: "rgba(0,0,0,0.55)", // watermark / tag badge fill
} as const;

// Warm on-brand gradients for the mascot/result preview (ember · gold · blush).
export const gradients: [string, string][] = [
  ["#EA580C", "#F59E0B"],
  ["#F59E0B", "#FDA4AF"],
  ["#EA580C", "#C2410C"],
  ["#FB923C", "#EA580C"],
  ["#F59E0B", "#EA580C"],
  ["#FDA4AF", "#EA580C"],
];

// Corner radius scale. Buttons/chips = pill, cards = lg, inputs = md.
export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

// 8pt base grid: multiples of 4, preferring 8 — 4·8·16·24·32·48·64
export const spacing = (n: number) => n * 4;

// Fredoka = display/headlines (never below 20px, never paragraphs).
// Inter = everything else.
export const font = {
  display: "Fredoka_700Bold",
  displaySemi: "Fredoka_600SemiBold",
  heading: "Inter_700Bold",
  semi: "Inter_600SemiBold",
  medium: "Inter_500Medium",
  body: "Inter_400Regular",
} as const;

// Card shadow ceiling per the constitution: 0 4px 16px rgba(31,41,55,0.08)
export const cardShadow = {
  shadowColor: "#1F2937",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 2,
} as const;

// Motion easing control points (see motion-concept.md). Never linear.
export const easing = {
  pounce: [0.34, 1.56, 0.64, 1] as const, // back-out spring
  zoomies: [0.16, 1, 0.3, 1] as const, // fast-out, gentle settle
};

export function gradientForSeed(seed: number): [string, string] {
  return gradients[seed % gradients.length];
}
