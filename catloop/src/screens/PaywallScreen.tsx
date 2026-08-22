import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge, Body, PrimaryButton, TextButton, Title } from "../components/ui";
import { notify } from "../lib/dialog";
import { LINKS, PRICING } from "../lib/links";
import { RootStackParamList } from "../navigation";
import { isSubscribed, useStore } from "../state/store";
import { colors, font, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Paywall">;

const FEATURES = [
  "Turn any cat photo into an 8-second AI video",
  "Best-in-class quality (Kling v2.5 Turbo)",
  "Up to 3 regenerations per video",
  "Save to your library and share anywhere",
];

export function PaywallScreen({ navigation }: Props) {
  const { startTrial, restoreWeekly, state } = useStore();

  function goMain() {
    navigation.reset({ index: 0, routes: [{ name: "Main" }] });
  }

  function onStartTrial() {
    // Production: StoreKit 2 purchase; entitlement comes from the store, never
    // hardcoded. Here we simulate a successful Apple IAP.
    startTrial();
    notify(
      "Trial started",
      `You're on the 3-day trial. You'll be charged ${PRICING.weeklyPrice}/week after it ends unless you cancel at least 24 hours before.`
    );
    goMain();
  }

  function onRestore() {
    if (isSubscribed(state.entitlement)) {
      notify("Already active", "Your subscription is active on this account.");
      return;
    }
    restoreWeekly();
    notify("Purchases restored", "Your CatLoop subscription is active again.");
    goMain();
  }

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#1E1330", colors.bg]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          <Pressable onPress={goMain} hitSlop={12} accessibilityLabel="Close">
            <Text style={styles.close}>✕</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Badge label="CatLoop Starter" />
          <Title style={{ marginTop: spacing(3) }}>Make your cat go viral</Title>
          <Body>Start with a 3-day trial. Cancel anytime.</Body>

          <View style={styles.features}>
            {FEATURES.map((f) => (
              <View key={f} style={styles.featureRow}>
                <Text style={styles.check}>✓</Text>
                <Body style={styles.featureText}>{f}</Body>
              </View>
            ))}
          </View>

          <View style={styles.planCard}>
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>3-day trial</Text>
              <Text style={styles.planPrice}>{PRICING.trialPrice}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>Then weekly</Text>
              <Text style={styles.planPrice}>{PRICING.weeklyPrice}/wk</Text>
            </View>
            <Text style={styles.planNote}>
              1 video per week · up to {PRICING.regenCap} regenerations each · auto-renews
            </Text>
          </View>

          <PrimaryButton label={`Start 3-day trial for ${PRICING.trialPrice}`} onPress={onStartTrial} />
          <Text style={styles.legal}>
            Start your 3-day trial for {PRICING.trialPrice}, then {PRICING.weeklyPrice}/week.
            Cancel anytime at least 24 hours before renewal in Settings → Subscriptions.
            Payment is charged to your Apple ID.
          </Text>

          <View style={styles.linksRow}>
            <TextButton label="Restore Purchases" onPress={onRestore} color={colors.text} />
            <Text style={styles.linkDot}>·</Text>
            <TextButton label="Terms" onPress={() => Linking.openURL(LINKS.terms)} />
            <Text style={styles.linkDot}>·</Text>
            <TextButton label="Privacy" onPress={() => Linking.openURL(LINKS.privacy)} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1 },
  topBar: { paddingHorizontal: spacing(5), paddingTop: spacing(2), alignItems: "flex-end" },
  close: { color: colors.textDim, fontSize: 20, padding: 4 },
  scroll: { paddingHorizontal: spacing(6), paddingBottom: spacing(8), gap: spacing(3) },
  features: { gap: spacing(2), marginVertical: spacing(3) },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  check: {
    color: colors.mint,
    fontFamily: font.heading,
    fontSize: 15,
    width: 18,
  },
  featureText: { flex: 1, color: colors.text },
  planCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: spacing(5),
    gap: spacing(2),
    marginBottom: spacing(2),
  },
  planRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  planLabel: { fontFamily: font.semi, color: colors.text, fontSize: 16 },
  planPrice: { fontFamily: font.heading, color: colors.text, fontSize: 20 },
  divider: { height: 1, backgroundColor: colors.cardBorder },
  planNote: { fontFamily: font.body, color: colors.textDim, fontSize: 13, marginTop: 4 },
  legal: {
    fontFamily: font.body,
    color: colors.textFaint,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: spacing(1),
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: spacing(3),
  },
  linkDot: { color: colors.textFaint },
});
