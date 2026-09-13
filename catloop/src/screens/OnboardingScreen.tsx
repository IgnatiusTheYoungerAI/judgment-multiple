import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoopPreview } from "../components/LoopPreview";
import { PounceIn, Zoomies } from "../components/motion";
import { Badge, Body, Hero, PrimaryButton, SecondaryButton, Title } from "../components/ui";
import { RootStackParamList } from "../navigation";
import { colors, font, radius, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export function OnboardingScreen({ navigation }: Props) {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  async function pickPhoto() {
    if (Platform.OS !== "web") {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (!res.canceled && res.assets[0]) setPhoto(res.assets[0].uri);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
        ))}
      </View>

      <Zoomies animateKey={step} style={styles.zoom}>
        {step === 0 && (
          <View style={styles.body}>
            <PounceIn style={styles.brandMark}>
              <Text style={styles.brandCat}>🐱</Text>
            </PounceIn>
            <PounceIn delay={60}>
              <Hero style={styles.center}>Catloop</Hero>
            </PounceIn>
            <PounceIn delay={120}>
              <Title style={styles.center}>Your cat. Hollywood movie.</Title>
            </PounceIn>
            <PounceIn delay={180}>
              <Body style={styles.center}>
                The fastest, cheapest, most shareable way to turn a cat photo into a video worth posting.
              </Body>
            </PounceIn>
            <View style={styles.spacer} />
            <PounceIn delay={240}>
              <PrimaryButton label="Get started" onPress={() => setStep(1)} />
            </PounceIn>
          </View>
        )}

        {step === 1 && (
          <View style={styles.body}>
            <Title>Pick your star</Title>
            <Body>One clear photo of your cat works best. You can change it later.</Body>
            <View style={styles.pickArea}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.pickImage} />
              ) : (
                <View style={styles.pickEmpty}>
                  <Text style={styles.pickEmoji}>📸</Text>
                  <Body style={styles.center}>No photo yet</Body>
                </View>
              )}
            </View>
            <SecondaryButton label={photo ? "Choose a different photo" : "Choose photo"} onPress={pickPhoto} />
            <View style={styles.spacer} />
            <PrimaryButton label="See a demo" onPress={() => setStep(2)} />
          </View>
        )}

        {step === 2 && (
          <View style={styles.body}>
            <Badge label="Demo · watermarked sample" tone="gold" />
            <Title style={{ marginTop: spacing(2) }}>Here&apos;s the loop</Title>
            <Body>This is our stock cat, not your photo. Start a plan to make one with your own.</Body>
            <PounceIn delay={80}>
              <LoopPreview seed={2} watermark />
            </PounceIn>
            <View style={styles.spacer} />
            <PrimaryButton
              label="Make one with your cat"
              onPress={() => navigation.navigate("Paywall", { context: "onboarding" })}
            />
          </View>
        )}
      </Zoomies>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper, paddingHorizontal: spacing(6), paddingBottom: spacing(6) },
  zoom: { flex: 1 },
  dots: { flexDirection: "row", gap: 8, justifyContent: "center", paddingVertical: spacing(4) },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  dotActive: { backgroundColor: colors.ember, width: 22 },
  body: { flex: 1, gap: spacing(4), justifyContent: "center" },
  center: { textAlign: "center" },
  spacer: { flex: 1 },
  brandMark: {
    alignSelf: "center",
    width: 104,
    height: 104,
    borderRadius: radius.lg,
    backgroundColor: colors.ember,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCat: { fontSize: 56 },
  pickArea: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pickImage: { width: "100%", height: "100%" },
  pickEmpty: { alignItems: "center", gap: 10 },
  pickEmoji: { fontSize: 56 },
});
