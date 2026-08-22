import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors, font, radius, spacing } from "../theme";

export function Title({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function Subtitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.subtitle, style]}>{children}</Text>;
}

export function Body({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

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
  const off = disabled || loading;
  return (
    <Pressable
      onPress={off ? undefined : onPress}
      style={({ pressed }) => [
        { opacity: off ? 0.5 : pressed ? 0.9 : 1, borderRadius: radius.pill },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <LinearGradient
        colors={[colors.accent, colors.primaryDeep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.primaryBtn}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.primaryLabel}>{label}</Text>
        )}
      </LinearGradient>
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
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.secondaryBtn,
        { opacity: disabled ? 0.45 : pressed ? 0.85 : 1 },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.secondaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function TextButton({
  label,
  onPress,
  color = colors.textDim,
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

export function Badge({
  label,
  tone = "default",
  style,
}: {
  label: string;
  tone?: "default" | "ai" | "success" | "warn";
  style?: StyleProp<ViewStyle>;
}) {
  const bg =
    tone === "ai"
      ? "rgba(75,225,196,0.16)"
      : tone === "success"
      ? "rgba(67,217,163,0.16)"
      : tone === "warn"
      ? "rgba(255,179,92,0.16)"
      : "rgba(177,92,255,0.16)";
  const fg =
    tone === "ai"
      ? colors.mint
      : tone === "success"
      ? colors.success
      : tone === "warn"
      ? "#FFB35C"
      : colors.primary;
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.badgeText, { color: fg }]}>{label}</Text>
    </View>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: font.heading,
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    fontFamily: font.semi,
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontFamily: font.body,
    color: colors.textDim,
    fontSize: 15,
    lineHeight: 22,
  },
  primaryBtn: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing(6),
  },
  primaryLabel: {
    fontFamily: font.heading,
    color: colors.white,
    fontSize: 17,
  },
  secondaryBtn: {
    height: 52,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing(6),
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.card,
  },
  secondaryLabel: {
    fontFamily: font.semi,
    color: colors.text,
    fontSize: 16,
  },
  textBtn: {
    fontFamily: font.medium,
    fontSize: 14,
  },
  badge: {
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontFamily: font.semi,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing(5),
  },
});
