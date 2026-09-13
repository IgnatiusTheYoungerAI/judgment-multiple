import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, Linking } from 'react-native';
import { BrandMark, GhostButton, PrimaryButton, Screen, Title, Body } from '../components/ui';
import { colors, space } from '../theme';
import { getAiConsent, setAiConsent } from '../lib/credits';
import { restorePurchases } from '../lib/purchases';

type Props = {
  onBack: () => void;
  onManageSubscription?: () => void;
};

export function SettingsScreen({ onBack }: Props) {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    getAiConsent().then(setConsent);
  }, []);

  async function toggleConsent(v: boolean) {
    await setAiConsent(v);
    setConsent(v);
  }

  async function restore() {
    const res = await restorePurchases();
    Alert.alert(res.active ? 'Restored' : 'No subscription', res.active ? 'Access restored.' : 'Nothing to restore.');
  }

  function deleteAccount() {
    Alert.alert(
      'Delete account',
      'This will remove your CatLoop account and associated data per our Privacy Policy. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => Alert.alert('Requested', 'Wire to DELETE /v1/account when backend is live.'),
        },
      ],
    );
  }

  return (
    <Screen>
      <BrandMark />
      <Title>Settings</Title>
      <Body>Subscriptions are managed through your Apple ID.</Body>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>AI processing consent</Text>
        <Switch
          value={consent}
          onValueChange={toggleConsent}
          trackColor={{ false: colors.line, true: colors.accentDim }}
          thumbColor={consent ? colors.accent : colors.textMuted}
        />
      </View>

      <PrimaryButton
        label="Manage subscription"
        onPress={() => Linking.openURL('https://apps.apple.com/account/subscriptions')}
      />
      <GhostButton label="Restore purchases" onPress={restore} />
      <GhostButton label="Delete account" onPress={deleteAccount} />
      <GhostButton label="Back" onPress={onBack} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bgElevated,
    borderRadius: 12,
    padding: space.md,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: space.lg,
  },
  rowLabel: { color: colors.text, fontWeight: '600', flex: 1, paddingRight: space.md },
});
