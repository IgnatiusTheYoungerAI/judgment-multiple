import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Linking,
  type ViewStyle,
} from 'react-native';
import { colors, space } from '../theme';

export function Screen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.screen, style]}>{children}</View>;
}

export function BrandMark() {
  return (
    <Text style={styles.brand} accessibilityRole="header">
      CatLoop
    </Text>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Body({ children }: { children: React.ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryBtn,
        disabled && styles.btnDisabled,
        pressed && !disabled && { opacity: 0.88 },
      ]}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </Pressable>
  );
}

export function GhostButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.ghostBtn}>
      <Text style={styles.ghostBtnText}>{label}</Text>
    </Pressable>
  );
}

export function LegalLinks() {
  const privacy = process.env.EXPO_PUBLIC_PRIVACY_URL ?? 'https://example.com/privacy';
  const terms = process.env.EXPO_PUBLIC_TERMS_URL ?? 'https://example.com/terms';
  return (
    <View style={styles.legalRow}>
      <Text style={styles.legalLink} onPress={() => Linking.openURL(terms)}>
        Terms of Use
      </Text>
      <Text style={styles.legalDot}>·</Text>
      <Text style={styles.legalLink} onPress={() => Linking.openURL(privacy)}>
        Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
    paddingBottom: space.lg,
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: space.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: space.sm,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textMuted,
    marginBottom: space.md,
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#1A1205',
    fontSize: 17,
    fontWeight: '700',
  },
  btnDisabled: { opacity: 0.45 },
  ghostBtn: { paddingVertical: 12, alignItems: 'center' },
  ghostBtnText: { color: colors.textMuted, fontSize: 15, fontWeight: '600' },
  legalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: space.md,
  },
  legalLink: { color: colors.textMuted, fontSize: 13, textDecorationLine: 'underline' },
  legalDot: { color: colors.textMuted },
});
