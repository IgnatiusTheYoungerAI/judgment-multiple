import React from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors, cardShadow, font, radius, spacing } from "../theme";
import { PurrLoop, useTailFlick } from "./motion";

export function Hero({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.hero, style]}>{children}</Text>;
}

export function Title({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function Subtitle({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.subtitle, style]}>{children}</Text>;
}

export function Body({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

export function Caption({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.caption, style]}>{children}</Text>;
}

// Button — solid ember fill + white text, OR outline ember on paper. No third style.
export function PrimaryButton({
  label,
  onPress,
  loading,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { flick, style: flickStyle } = useTailFlick();
  const off = disabled || loading;
  const label_ = (
    <Text style={styles.primaryLabel}>{label}</Text>
  );
  return (
    <Pressable
      disabled={off}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        if (off) return;
        flick();
        onPress();
      }}
      style={({ pressed }) => [
        styles.primaryBtn,
        { backgroundColor: pressed ? colors.emberDark : colors.ember, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {loading ? <PurrLoop>{label_}</PurrLoop> : <Animated.View style={flickStyle}>{label_}</Animated.View>}
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { flick, style: flickStyle } = useTailFlick();
  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        if (disabled) return;
        flick();
        onPress();
      }}
      style={({ pressed }) => [styles.outlineBtn, { opacity: disabled ? 0.45 : pressed ? 0.85 : 1 }, style]}
    >
      <Animated.View style={flickStyle}>
        <Text style={styles.outlineLabel}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

export function TextButton({
  label,
  onPress,
  color = colors.inkDim,
  style,
}: {
  label: string;
  onPress: () => void;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link">
      <Text style={[styles.textBtn, { color }, style]}>{label}</Text>
    </Pressable>
  );
}

// Chip / Selector — pill, ink@8% border inactive, solid ember active.
export function Chip({
  label,
  active,
  onPress,
  style,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { flick, style: flickStyle } = useTailFlick();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
      onPress={() => {
        flick();
        onPress();
      }}
      style={({ pressed }) => [
        styles.chip,
        active ? styles.chipActive : styles.chipInactive,
        { opacity: pressed ? 0.9 : 1 },
        style,
      ]}
    >
      <Animated.View style={flickStyle}>
        <Text style={[styles.chipText, { color: active ? colors.white : colors.ink }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

// Tag / Watermark badge — scrim pill, white text, paw prefix. The brand's most
// repeated shareable asset; treated as seriously as the logo.
export function Tag({ label, style }: { label: string; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.tag, style]}>
      <Text style={styles.tagText}>🐾 {label}</Text>
    </View>
  );
}

// Price badge — white pill, ember or gold price text. Price visible before click.
export function PriceBadge({
  price,
  tone = "ember",
  style,
}: {
  price: string;
  tone?: "ember" | "gold";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.priceBadge, style]}>
      <Text style={[styles.priceText, { color: tone === "gold" ? colors.gold : colors.ember }]}>{price}</Text>
    </View>
  );
}

// Small status pill within tokens (ember / gold / neutral).
export function Badge({
  label,
  tone = "neutral",
  style,
}: {
  label: string;
  tone?: "ember" | "gold" | "neutral";
  style?: StyleProp<ViewStyle>;
}) {
  const bg = tone === "ember" ? "rgba(234,88,12,0.12)" : tone === "gold" ? "rgba(245,158,11,0.14)" : colors.border;
  const fg = tone === "ember" ? colors.ember : tone === "gold" ? colors.gold : colors.inkDim;
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.badgeText, { color: fg }]}>{label}</Text>
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  hero: { fontFamily: font.display, color: colors.ink, fontSize: 40, lineHeight: 46 },
  title: { fontFamily: font.display, color: colors.ink, fontSize: 30, lineHeight: 36 },
  subtitle: { fontFamily: font.heading, color: colors.ink, fontSize: 20, lineHeight: 26 },
  body: { fontFamily: font.body, color: colors.ink, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: font.body, color: colors.inkDim, fontSize: 13, lineHeight: 19 },

  primaryBtn: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing(6),
  },
  primaryLabel: { fontFamily: font.heading, color: colors.white, fontSize: 16 },

  outlineBtn: {
    height: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing(6),
    borderWidth: 1.5,
    borderColor: colors.ember,
    backgroundColor: colors.paper,
  },
  outlineLabel: { fontFamily: font.heading, color: colors.ember, fontSize: 16 },

  textBtn: { fontFamily: font.semi, fontSize: 14 },

  chip: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(2),
    borderWidth: 1,
  },
  chipInactive: { backgroundColor: colors.surface, borderColor: colors.border },
  chipActive: { backgroundColor: colors.ember, borderColor: colors.ember },
  chipText: { fontFamily: font.semi, fontSize: 14 },

  tag: {
    borderRadius: radius.pill,
    backgroundColor: colors.scrim,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  tagText: { fontFamily: font.semi, color: colors.white, fontSize: 12 },

  priceBadge: {
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceText: { fontFamily: font.display, fontSize: 18 },

  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  badgeText: { fontFamily: font.semi, fontSize: 12, letterSpacing: 0.2 },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(5),
    ...cardShadow,
  },
});
