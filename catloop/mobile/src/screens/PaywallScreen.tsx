import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  BrandMark,
  Body,
  PrimaryButton,
  GhostButton,
  Screen,
  Title,
  LegalLinks,
} from '../components/ui';
import { PAYWALL_COPY } from '../config/pricing';
import { colors, space } from '../theme';
import { getWeeklyOffering, paywallDisclosure, purchaseWeekly, restorePurchases, type OfferingState } from '../lib/purchases';

type Props = {
  onPurchased: () => void;
};

export function PaywallScreen({ onPurchased }: Props) {
  const [offering, setOffering] = useState<OfferingState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeeklyOffering().then(setOffering);
  }, []);

  async function buy() {
    setBusy(true);
    setError(null);
    const res = await purchaseWeekly();
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? 'Purchase failed');
      return;
    }
    onPurchased();
  }

  async function restore() {
    setBusy(true);
    setError(null);
    const res = await restorePurchases();
    setBusy(false);
    if (res.active) onPurchased();
    else setError('No active subscription found');
  }

  return (
    <Screen>
      <BrandMark />
      <Title>{PAYWALL_COPY.headline}</Title>
      <Body>{PAYWALL_COPY.body}</Body>

      <View style={styles.priceCard}>
        {offering ? (
          <>
            <Text style={styles.priceMain}>
              {offering.eligibleForIntro ? offering.introPriceString : offering.priceString}
              <Text style={styles.pricePeriod}> first week</Text>
            </Text>
            <Text style={styles.priceThen}>then {offering.priceString}/week</Text>
          </>
        ) : (
          <ActivityIndicator color={colors.accent} />
        )}
      </View>

      <Text style={styles.disclosure}>{offering ? paywallDisclosure(offering) : PAYWALL_COPY.cta}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.footer}>
        <PrimaryButton label={busy ? 'Working…' : 'Start CatLoop'} onPress={buy} disabled={busy || !offering} />
        <GhostButton label={PAYWALL_COPY.restore} onPress={restore} />
        <LegalLinks />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  priceCard: {
    backgroundColor: colors.bgElevated,
    borderRadius: 16,
    padding: space.lg,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: space.md,
  },
  priceMain: { color: colors.text, fontSize: 36, fontWeight: '700' },
  pricePeriod: { fontSize: 18, fontWeight: '500', color: colors.textMuted },
  priceThen: { marginTop: 6, color: colors.accent, fontSize: 16, fontWeight: '600' },
  disclosure: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: space.md },
  error: { color: colors.danger, marginBottom: space.sm },
  footer: { marginTop: 'auto', gap: 4 },
});
