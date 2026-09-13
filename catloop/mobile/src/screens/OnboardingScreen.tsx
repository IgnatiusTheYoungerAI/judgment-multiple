import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BrandMark, Body, PrimaryButton, Screen } from '../components/ui';
import { colors, space } from '../theme';

type Props = { onContinue: () => void };

export function OnboardingScreen({ onContinue }: Props) {
  return (
    <Screen>
      <BrandMark />
      <Body>Your cat’s big break is one photo away.</Body>

      <View style={styles.hero}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.heroImage}
          accessibilityLabel="CatLoop demo still"
        />
        <Text style={styles.badge}>AI-generated demo</Text>
      </View>

      <Text style={styles.note}>
        Watch a sample, then unlock your own 5-second clip. No free personal renders — every generation is funded.
      </Text>

      <View style={styles.footer}>
        <PrimaryButton label="Make one with my cat" onPress={onContinue} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.bgElevated,
    marginVertical: space.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: { width: 160, height: 160, opacity: 0.9 },
  badge: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    color: colors.text,
    backgroundColor: 'rgba(15,20,25,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '600',
  },
  note: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginBottom: space.md },
  footer: { gap: space.sm },
});
