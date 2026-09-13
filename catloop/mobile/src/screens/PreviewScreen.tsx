import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Sharing from 'expo-sharing';
import { BrandMark, PrimaryButton, GhostButton, Screen, Title, Body } from '../components/ui';
import { colors, space } from '../theme';

type Props = {
  uri: string;
  busy?: boolean;
  attemptsRemaining: number;
  onRegen: () => void;
  onDone: () => void;
  onReport: () => void;
};

export function PreviewScreen({ uri, busy, attemptsRemaining, onRegen, onDone, onReport }: Props) {
  async function share() {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, { dialogTitle: 'Share your CatLoop video' });
    }
  }

  return (
    <Screen>
      <BrandMark />
      <Title>Your clip</Title>
      <Body>AI-generated · Made with CatLoop</Body>

      <View style={styles.frame}>
        {busy ? (
          <ActivityIndicator size="large" color={colors.accent} />
        ) : (
          <Image source={{ uri }} style={styles.media} accessibilityLabel="Generated result preview" />
        )}
      </View>

      <Text style={styles.meta}>{attemptsRemaining} take{attemptsRemaining === 1 ? '' : 's'} left</Text>

      <View style={styles.footer}>
        <PrimaryButton label="Share" onPress={share} disabled={busy} />
        <GhostButton label={attemptsRemaining > 0 ? 'Regenerate' : 'No takes left'} onPress={onRegen} />
        <GhostButton label="Done" onPress={onDone} />
        <GhostButton label="Report this result" onPress={onReport} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: space.md,
  },
  media: { width: '100%', height: '100%' },
  meta: { color: colors.textMuted, marginBottom: space.sm },
  footer: { gap: 2 },
});
