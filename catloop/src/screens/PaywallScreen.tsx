import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PounceIn } from "../components/motion";
import { Badge, Body, Caption, PriceBadge, PrimaryButton, TextButton, Title } from "../components/ui";
import { notify } from "../lib/dialog";
import { LINKS, PRICING } from "../lib/links";
import { RootStackParamList } from "../navigation";
import { isSubscribed, useStore } from "../state/store";
import { colors, font, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Paywall">;

const FEATURES = [
  "Turn any cat photo into an 8-second video",
  "Best-in-class quality — the good model, not the cheap one",
  "Up to 3 do-overs per video",
  "Save and share anywhere",
];

export function PaywallScreen({ navigation }: Props) {
  const { startTrial, restoreWeekly, state } = useStore();

  function goMain() {
    navigation.reset({ index: 0, routes: [{ name: "Main" }] });
  }

  function onStartTrial() {
    // Production: StoreKit 2 purchase; entitlement comes from the store.
    startTrial();
    notify(
      "You're in",
      `3-day trial started. It becomes ${PRICING.weeklyPrice}/week after, unless you cancel at least 24 hours before renewal.`
    );
    goMain();
  }

  function onRestore() {
    if (isSubscribed(state.entitlement)) {
      notify("Already active", "Your subscription is active on this account.");
      return;
    }
    restoreWeekly();
    notify("Purchases restored", "Your Catloop subscription is active again.");
    goMain();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable onPress={goMain} hitSlop={12} accessibilityLabel="Close">
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <PounceIn>
          <Badge label="Catloop Starter" tone="ember" />
          <Title style={{ marginTop: spacing(3) }}>Make your cat go viral</Title>
          <Body>Start with a 3-day trial. Cancel anytime.</Body>
        </PounceIn>

        <View style={styles.features}>
          {FEATURES.map((f, idx) => (
            <PounceIn key={f} delay={80 + idx * 60}>
              <View style={styles.featureRow}>
                <Text style={styles.check}>✓</Text>
                <Body style={styles.featureText}>{f}</Body>
              </View>
            </PounceIn>
          ))}
        </View>

        <PounceIn delay={340}>
          <View style={styles.planCard}>
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>3-day trial</Text>
              <PriceBadge price={PRICING.trialPrice} tone="gold" />
            </View>
            <View style={styles.divider} />
            <View style={styles.planRow}>
              <Text style={styles.planLabel}>Then weekly</Text>
              <PriceBadge price={`${PRICING.weeklyPrice}/wk`} tone="ember" />
            </View>
            <Caption style={{ marginTop: spacing(1) }}>
              1 video per week · up to {PRICING.regenCap} do-overs each · auto-renews
            </Caption>
          </View>
        </PounceIn>

        <PounceIn delay={420}>
          <PrimaryButton label={`Start 3-day trial for ${PRICING.trialPrice}`} onPress={onStartTrial} />
        </PounceIn>
        <Caption style={styles.legal}>
          Start your 3-day trial for {PRICING.trialPrice}, then {PRICING.weeklyPrice}/week. Cancel anytime at least
          24 hours before renewal in Settings → Subscriptions. Payment is charged to your Apple ID.
        </Caption>

        <View style={styles.linksRow}>
          <TextButton label="Restore Purchases" onPress={onRestore} color={colors.ink} />
          <Text style={styles.linkDot}>·</Text>
          <TextButton label="Terms" onPress={() => Linking.openURL(LINKS.terms)} color={colors.ember} />
          <Text style={styles.linkDot}>·</Text>
          <TextButton label="Privacy" onPress={() => Linking.openURL(LINKS.privacy)} color={colors.ember} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  topBar: { paddingHorizontal: spacing(5), paddingTop: spacing(2), alignItems: "flex-end" },
  close: { color: colors.inkDim, fontSize: 20, padding: 4 },
  scroll: { paddingHorizontal: spacing(6), paddingBottom: spacing(8), gap: spacing(3) },
  features: { gap: spacing(2), marginVertical: spacing(3) },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  check: { color: colors.ember, fontFamily: font.heading, fontSize: 15, width: 18 },
  featureText: { flex: 1 },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.ember,
    padding: spacing(5),
    gap: spacing(2),
  },
  planRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  planLabel: { fontFamily: font.semi, color: colors.ink, fontSize: 16 },
  divider: { height: 1, backgroundColor: colors.border },
  legal: { textAlign: "center", marginTop: spacing(1) },
  linksRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8, marginTop: spacing(3) },
  linkDot: { color: colors.inkFaint },
});
