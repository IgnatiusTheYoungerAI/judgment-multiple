import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LoopPreview } from "../../components/LoopPreview";
import { Badge, Body, Card, PrimaryButton, SecondaryButton, TextButton } from "../../components/ui";
import { notify, reportOutput } from "../../lib/dialog";
import { newSeed, startRender } from "../../lib/generation";
import { PRICING } from "../../lib/links";
import { REGEN_CAP, VideoItem, isSubscribed, useStore } from "../../state/store";
import { colors, font, radius, spacing } from "../../theme";

type Phase = "idle" | "generating" | "done";

export function CreateTab({ onLocked }: { onLocked: () => void }) {
  const { state, consumeCredit, addVideo } = useStore();
  const [prompt, setPrompt] = useState("");
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState<VideoItem | null>(null);
  const cancelRef = useRef<null | (() => void)>(null);

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

  function runRender(onComplete: (seed: number) => void) {
    setProgress(0);
    setPhase("generating");
    const job = startRender(setProgress);
    cancelRef.current = job.cancel;
    job.promise
      .then(({ seed }) => {
        cancelRef.current = null;
        onComplete(seed);
        setPhase("done");
      })
      .catch(() => {
        cancelRef.current = null;
        setPhase("idle");
      });
  }

  function onGenerate() {
    if (!isSubscribed(state.entitlement)) {
      onLocked();
      return;
    }
    if (state.videoCreditsRemaining <= 0) {
      notify(
        "No video credits left",
        state.entitlement === "weekly"
          ? "You've used this week's video. A new credit unlocks when your week renews. Credits don't roll over."
          : "You've used all your trial videos. They renew when your weekly plan starts."
      );
      return;
    }
    if (!photo && prompt.trim().length === 0) {
      notify("Add a photo or prompt", "Pick a cat photo, or describe the clip you want.");
      return;
    }
    consumeCredit();
    runRender((seed) => {
      setVideo({
        id: `v_${Date.now()}`,
        createdAt: Date.now(),
        prompt: prompt.trim(),
        photoUri: photo,
        source: "user",
        regens: 0,
        seed,
      });
    });
  }

  function onRegen() {
    if (!video) return;
    if (video.regens >= REGEN_CAP) {
      notify("Regen limit reached", `You've used all ${REGEN_CAP} regenerations for this video.`);
      return;
    }
    runRender((seed) => {
      setVideo((v) => (v ? { ...v, seed: seed || newSeed(), regens: v.regens + 1 } : v));
    });
  }

  function onSave() {
    if (!video) return;
    addVideo(video);
    notify("Saved to your library", "You can share it anytime from Library.");
    resetToIdle();
  }

  function onShare() {
    if (!video) return;
    const shareText = "Made with CatLoop — AI cat video maker";
    const nav = typeof navigator !== "undefined" ? (navigator as Navigator) : undefined;
    if (Platform.OS === "web" && nav && "share" in nav) {
      nav.share({ title: "CatLoop", text: shareText }).catch(() => {});
    } else {
      notify("Share", "Your AI video is ready to share to TikTok, Reels, or Shorts.");
    }
  }

  function resetToIdle() {
    setVideo(null);
    setPhase("idle");
    setProgress(0);
    setPrompt("");
    setPhoto(undefined);
  }

  const generating = phase === "generating";

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {phase === "done" && video ? (
        <View style={{ gap: spacing(4) }}>
          <Badge label="Your AI video" tone="success" />
          <LoopPreview photoUri={video.photoUri} seed={video.seed} />
          <View style={styles.metaRow}>
            <Body>
              Regenerations used: {video.regens}/{REGEN_CAP}
            </Body>
            <TextButton label="Report" color={colors.danger} onPress={() => reportOutput(resetToIdle)} />
          </View>
          <View style={styles.actionRow}>
            <SecondaryButton
              label="Regenerate"
              onPress={onRegen}
              disabled={video.regens >= REGEN_CAP}
              style={styles.flex}
            />
            <SecondaryButton label="Share" onPress={onShare} style={styles.flex} />
          </View>
          <PrimaryButton label="Save to library" onPress={onSave} />
          <TextButton label="Start over" onPress={resetToIdle} color={colors.textDim} style={styles.centerLink} />
        </View>
      ) : (
        <View style={{ gap: spacing(4) }}>
          <View style={styles.previewWrap}>
            {generating ? (
              <LoopPreview photoUri={photo} seed={1} generating progress={progress} />
            ) : (
              <Pressable onPress={pickPhoto} style={styles.dropzone}>
                {photo ? (
                  <Image source={{ uri: photo }} style={StyleSheet.absoluteFill as object} />
                ) : (
                  <View style={styles.dropInner}>
                    <Text style={styles.dropEmoji}>🐱</Text>
                    <Body style={styles.center}>Tap to add a cat photo</Body>
                  </View>
                )}
              </Pressable>
            )}
          </View>

          {!generating && (
            <>
              <Card style={{ gap: spacing(2), padding: spacing(4) }}>
                <Text style={styles.inputLabel}>Mood or caption (optional)</Text>
                <TextInput
                  value={prompt}
                  onChangeText={setPrompt}
                  placeholder="e.g. sleepy tabby in a cozy sunbeam"
                  placeholderTextColor={colors.textFaint}
                  style={styles.input}
                  multiline
                />
              </Card>

              <View style={styles.creditRow}>
                <Badge
                  label={
                    isSubscribed(state.entitlement)
                      ? `${state.videoCreditsRemaining} video credit${state.videoCreditsRemaining === 1 ? "" : "s"} left`
                      : "No active plan"
                  }
                  tone={isSubscribed(state.entitlement) ? "ai" : "warn"}
                />
                <Body>8s · Kling v2.5 Turbo</Body>
              </View>

              <PrimaryButton label="Generate video" onPress={onGenerate} />
              <Body style={styles.disclaimer}>
                Videos are AI-generated. Your photo and prompt are sent to a
                third-party video model to create the clip. {PRICING.regenCap} regenerations max per video.
              </Body>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing(5), paddingBottom: spacing(10), gap: spacing(4) },
  previewWrap: { width: "100%" },
  dropzone: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  dropInner: { alignItems: "center", gap: 10 },
  dropEmoji: { fontSize: 72 },
  center: { textAlign: "center" },
  inputLabel: { fontFamily: font.semi, color: colors.textDim, fontSize: 13 },
  input: {
    fontFamily: font.body,
    color: colors.text,
    fontSize: 15,
    minHeight: 44,
    paddingVertical: 6,
  },
  creditRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  disclaimer: { fontSize: 12, color: colors.textFaint, lineHeight: 18 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  actionRow: { flexDirection: "row", gap: spacing(3) },
  flex: { flex: 1 },
  centerLink: { textAlign: "center", alignSelf: "center" },
});
