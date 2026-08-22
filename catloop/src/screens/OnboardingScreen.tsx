import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoopPreview } from "../components/LoopPreview";
import { Badge, Body, PrimaryButton, SecondaryButton, Title } from "../components/ui";
import { RootStackParamList } from "../navigation";
import { colors, font, radius, spacing } from "../theme";
import { Text } from "react-native";

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
    <View style={styles.root}>
      <LinearGradient
        colors={["#160E24", colors.bg]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={[styles.dot, i === step && styles.dotActive]}
            />
          ))}
        </View>

        {step === 0 && (
          <View style={styles.body}>
            <View style={styles.brandMark}>
              <Text style={styles.brandCat}>🐱</Text>
            </View>
            <Text style={styles.brand}>CatLoop</Text>
            <Title style={styles.center}>Turn your cat into an 8-second AI video</Title>
            <Body style={styles.center}>
              Best-in-class cat clips for TikTok, Reels and Shorts — made in
              under a minute. No editing skills required.
            </Body>
            <View style={styles.spacer} />
            <PrimaryButton label="Get started" onPress={() => setStep(1)} />
          </View>
        )}

        {step === 1 && (
          <View style={styles.body}>
            <Title>Pick a cat photo</Title>
            <Body>
              We&apos;ll use it to show you what CatLoop can do. One clear photo
              of your cat works best.
            </Body>
            <View style={styles.pickArea}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.pickImage} />
              ) : (
                <View style={styles.pickEmpty}>
                  <Text style={styles.pickEmoji}>📸</Text>
                  <Body style={styles.center}>No photo selected yet</Body>
                </View>
              )}
            </View>
            <SecondaryButton
              label={photo ? "Choose a different photo" : "Choose photo"}
              onPress={pickPhoto}
            />
            <View style={styles.spacer} />
            <PrimaryButton label="See a demo result" onPress={() => setStep(2)} />
          </View>
        )}

        {step === 2 && (
          <View style={styles.body}>
            <Badge label="DEMO · watermarked sample" tone="warn" />
            <Title style={{ marginTop: spacing(2) }}>Here&apos;s the loop</Title>
            <Body>
              This is a sample from our stock cat, not your photo. Start a plan
              to make one with your own cat.
            </Body>
            <View style={styles.demoWrap}>
              <LoopPreview seed={2} watermark />
            </View>
            <PrimaryButton
              label="Make one with your cat"
              onPress={() => navigation.navigate("Paywall", { context: "onboarding" })}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1, paddingHorizontal: spacing(6), paddingBottom: spacing(6) },
  dots: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    paddingVertical: spacing(4),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cardBorder,
  },
  dotActive: { backgroundColor: colors.primary, width: 22 },
  body: { flex: 1, gap: spacing(4), justifyContent: "center" },
  center: { textAlign: "center" },
  spacer: { flex: 1 },
  brandMark: {
    alignSelf: "center",
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCat: { fontSize: 52 },
  brand: {
    fontFamily: font.brandBold,
    color: colors.text,
    fontSize: 40,
    textAlign: "center",
  },
  pickArea: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  pickImage: { width: "100%", height: "100%" },
  pickEmpty: { alignItems: "center", gap: 10 },
  pickEmoji: { fontSize: 56 },
  demoWrap: { width: "100%" },
});
