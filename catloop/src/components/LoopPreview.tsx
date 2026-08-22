import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { colors, font, gradientForSeed, radius } from "../theme";
import { PurrLoop } from "./motion";
import { Tag } from "./ui";

const STATUS_MESSAGES = [
  "Warming up the catnip engine…",
  "Herding the pixels…",
  "Consulting the cat council…",
  "Fluffing every whisker…",
  "Almost purrfect…",
];

// Rotating status text on a slow 1400ms crossfade (Purr-Loop's calm cadence).
function RotatingStatus() {
  const [i, setI] = useState(0);
  const op = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const id = setInterval(() => {
      Animated.timing(op, { toValue: 0, duration: 350, useNativeDriver: false }).start(() => {
        setI((v) => (v + 1) % STATUS_MESSAGES.length);
        Animated.timing(op, { toValue: 1, duration: 350, useNativeDriver: false }).start();
      });
    }, 1400);
    return () => clearInterval(id);
  }, [op]);
  return <Animated.Text style={[styles.status, { opacity: op }]}>{STATUS_MESSAGES[i]}</Animated.Text>;
}

/**
 * Stands in for the rendered 8s AI clip. Production plays the signed MP4 via
 * expo-av; here we animate the source frame so the loop is demonstrable. Always
 * tagged AI-generated. Generating state uses Purr-Loop (never a spinner).
 */
export function LoopPreview({
  photoUri,
  seed,
  watermark,
  generating,
  progress = 0,
}: {
  photoUri?: string;
  seed: number;
  watermark?: boolean;
  generating?: boolean;
  progress?: number;
}) {
  const loop = useRef(new Animated.Value(0)).current;
  const [c1, c2] = gradientForSeed(seed);

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(loop, {
        toValue: 1,
        duration: 3600,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: false,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [loop]);

  const scale = loop.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1.04, 1.12, 1.04] });
  const translateX = loop.interpolate({ inputRange: [0, 1], outputRange: [-10, 10] });

  return (
    <View style={styles.frame}>
      <LinearGradient colors={[c1, c2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      {photoUri ? (
        <Animated.Image
          source={{ uri: photoUri }}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, { transform: [{ scale }, { translateX }] }]}
        />
      ) : (
        <Animated.View style={[StyleSheet.absoluteFill, styles.center, { transform: [{ scale }, { translateX }] }]}>
          <Text style={styles.cat}>🐱</Text>
        </Animated.View>
      )}

      <LinearGradient colors={["transparent", "rgba(31,41,55,0.35)"]} style={StyleSheet.absoluteFill} />

      <Tag label="AI-generated" style={styles.aiTag} />

      {watermark ? <Tag label="demo" style={styles.watermark} /> : null}

      {generating ? (
        <View style={styles.genOverlay}>
          <PurrLoop>
            <Text style={styles.genCat}>🐱</Text>
          </PurrLoop>
          <RotatingStatus />
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  center: { alignItems: "center", justifyContent: "center" },
  cat: { fontSize: 128 },
  aiTag: { position: "absolute", top: 12, left: 12 },
  watermark: { position: "absolute", bottom: 12, right: 12 },
  genOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,247,237,0.82)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  genCat: { fontSize: 72 },
  status: { fontFamily: font.semi, color: colors.ink, fontSize: 15, textAlign: "center" },
  progressTrack: {
    width: "82%",
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  progressFill: { height: 8, borderRadius: radius.pill, backgroundColor: colors.ember },
});
