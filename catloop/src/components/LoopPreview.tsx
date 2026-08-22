import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";
import { colors, font, gradientForSeed, radius } from "../theme";

/**
 * Stands in for the rendered 8-second AI clip. A real build plays the signed
 * MP4 from the render job via expo-av; here we animate the source frame so the
 * product loop (generate -> preview -> save/share) is fully demonstrable
 * without a live video model. Always labelled AI-generated.
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
  const sheen = loop.interpolate({ inputRange: [0, 1], outputRange: [-260, 260] });

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
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.center,
            { transform: [{ scale }, { translateX }] },
          ]}
        >
          <Text style={styles.cat}>🐱</Text>
        </Animated.View>
      )}

      <LinearGradient
        colors={["transparent", "rgba(11,7,19,0.55)"]}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        pointerEvents="none"
        style={[styles.sheen, { transform: [{ translateX: sheen }, { rotate: "18deg" }] }]}
      />

      <View style={styles.aiTag}>
        <View style={styles.dot} />
        <Text style={styles.aiTagText}>AI-generated</Text>
      </View>

      {watermark ? (
        <View style={styles.watermark} pointerEvents="none">
          <Text style={styles.watermarkText}>CatLoop · demo</Text>
        </View>
      ) : null}

      {generating ? (
        <View style={styles.genOverlay}>
          <Text style={styles.genLabel}>Rendering 8s clip…</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
          <Text style={styles.genPct}>{Math.round(progress * 100)}%</Text>
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
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  center: { alignItems: "center", justifyContent: "center" },
  cat: { fontSize: 128 },
  sheen: {
    position: "absolute",
    top: -60,
    bottom: -60,
    width: 90,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  aiTag: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11,7,19,0.6)",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.mint,
    marginRight: 6,
  },
  aiTagText: {
    fontFamily: font.semi,
    color: colors.text,
    fontSize: 12,
  },
  watermark: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(11,7,19,0.5)",
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  watermarkText: {
    fontFamily: font.medium,
    color: colors.textDim,
    fontSize: 11,
  },
  genOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(11,7,19,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  genLabel: {
    fontFamily: font.semi,
    color: colors.text,
    fontSize: 15,
    marginBottom: 14,
  },
  progressTrack: {
    width: "82%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.mint,
  },
  genPct: {
    fontFamily: font.semi,
    color: colors.textDim,
    fontSize: 13,
    marginTop: 10,
  },
});
