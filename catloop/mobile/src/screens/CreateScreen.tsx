import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BrandMark, Body, PrimaryButton, Screen, Title } from '../components/ui';
import { STYLE_PRESETS, ENTITLEMENTS } from '../config/pricing';
import { colors, space } from '../theme';
import type { CreditState } from '../lib/credits';
import { canStartOrRegen } from '../lib/credits';

type Props = {
  credits: CreditState;
  onGenerate: (payload: { uri: string; presetId: string; mood: string }) => void;
  onOpenSettings: () => void;
};

export function CreateScreen({ credits, onGenerate, onOpenSettings }: Props) {
  const [uri, setUri] = useState<string | null>(null);
  const [presetId, setPresetId] = useState<string>(STYLE_PRESETS[0].id);
  const [mood, setMood] = useState('');

  async function pick() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Photo access needed', 'CatLoop needs a cat photo to generate your video.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
    });
    if (!res.canceled && res.assets[0]) setUri(res.assets[0].uri);
  }

  const canGen = Boolean(uri) && canStartOrRegen(credits, 'new');

  return (
    <Screen>
      <View style={styles.topRow}>
        <BrandMark />
        <Pressable onPress={onOpenSettings} accessibilityRole="button">
          <Text style={styles.settings}>Settings</Text>
        </Pressable>
      </View>
      <Title>Create</Title>
      <Body>
        {credits.videosRemaining} video left · {ENTITLEMENTS.clipSeconds}s · up to{' '}
        {ENTITLEMENTS.maxAttemptsPerVideo} takes
      </Body>

      <Pressable style={styles.picker} onPress={pick} accessibilityRole="button">
        {uri ? (
          <Image source={{ uri }} style={styles.photo} />
        ) : (
          <Text style={styles.pickerText}>Choose cat photo</Text>
        )}
      </Pressable>

      <Text style={styles.label}>Style</Text>
      <View style={styles.presets}>
        {STYLE_PRESETS.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => setPresetId(p.id)}
            style={[styles.chip, presetId === p.id && styles.chipOn]}
          >
            <Text style={[styles.chipText, presetId === p.id && styles.chipTextOn]}>{p.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Mood (optional)</Text>
      <TextInput
        value={mood}
        onChangeText={setMood}
        placeholder="e.g. playful, dramatic"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <View style={styles.footer}>
        <PrimaryButton
          label="Generate"
          disabled={!canGen}
          onPress={() => uri && onGenerate({ uri, presetId, mood })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settings: { color: colors.accent, fontWeight: '600' },
  picker: {
    height: 220,
    borderRadius: 16,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: space.md,
  },
  pickerText: { color: colors.textMuted, fontSize: 16, fontWeight: '600' },
  photo: { width: '100%', height: '100%' },
  label: { color: colors.text, fontWeight: '600', marginBottom: space.sm },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: space.md },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { color: colors.textMuted, fontWeight: '600', fontSize: 13 },
  chipTextOn: { color: '#1A1205' },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.bgElevated,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    marginBottom: space.md,
  },
  footer: { marginTop: 'auto' },
});
