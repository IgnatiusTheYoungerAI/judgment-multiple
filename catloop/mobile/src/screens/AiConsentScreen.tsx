import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { BrandMark, Body, PrimaryButton, GhostButton, Screen, Title } from '../components/ui';
import { colors, space } from '../theme';
import { setAiConsent } from '../lib/credits';

type Props = {
  providerName?: string;
  onAgreed: () => void;
  onSkip?: () => void;
};

export function AiConsentScreen({
  providerName = 'our third-party video AI provider',
  onAgreed,
  onSkip,
}: Props) {
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);

  async function confirm() {
    if (!on) return;
    setBusy(true);
    await setAiConsent(true);
    setBusy(false);
    onAgreed();
  }

  return (
    <Screen>
      <BrandMark />
      <Title>AI processing consent</Title>
      <Body>
        To create your video, CatLoop will send your selected photo and optional text prompt to{' '}
        {providerName}. That data is used only to generate your clip. You can revoke this anytime in
        Settings.
      </Body>

      <View style={styles.card}>
        <Text style={styles.cardText}>I agree to share my photo and prompt with {providerName} for video generation.</Text>
        <Switch
          value={on}
          onValueChange={setOn}
          trackColor={{ false: colors.line, true: colors.accentDim }}
          thumbColor={on ? colors.accent : colors.textMuted}
          accessibilityLabel="Agree to AI processing"
        />
      </View>

      <View style={styles.footer}>
        <PrimaryButton label="Continue" onPress={confirm} disabled={!on || busy} />
        {onSkip ? <GhostButton label="Back" onPress={onSkip} /> : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: 14,
    padding: space.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    borderWidth: 1,
    borderColor: colors.line,
    marginTop: space.sm,
  },
  cardText: { flex: 1, color: colors.text, fontSize: 15, lineHeight: 22 },
  footer: { marginTop: 'auto', gap: space.sm },
});
