import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { LoopPreview } from "../../components/LoopPreview";
import { PounceIn, Zoomies } from "../../components/motion";
import { Badge, Body, Caption, Card, Chip, PrimaryButton, SecondaryButton, TextButton } from "../../components/ui";
import { notify, reportOutput } from "../../lib/dialog";
import { newSeed, startRender } from "../../lib/generation";
import { PRICING } from "../../lib/links";
import { REGEN_CAP, VideoItem, isSubscribed, useStore } from "../../state/store";
import { colors, font, radius, spacing } from "../../theme";

type Phase = "idle" | "generating" | "done";

const STYLES = ["Cozy", "Cinematic", "Zoomies", "Noir", "Dreamy"];

export function CreateTab({ onLocked }: { onLocked: () => void }) {
  const { state, consumeCredit, addVideo } = useStore();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Cozy");
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

  function composePrompt(): string {
    const base = prompt.trim();
    return base ? `${style} · ${base}` : style;
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
          ? "You've used this week's video. A new one unlocks when your week renews — credits don't roll over."
          : "You've used all your trial videos."
      );
      return;
    }
    if (!photo && prompt.trim().length === 0) {
      notify("Add a photo or a vibe", "Pick a cat photo, or type the mood you want.");
      return;
    }
    consumeCredit();
    runRender((seed) => {
      setVideo({
        id: `v_${Date.now()}`,
        createdAt: Date.now(),
        prompt: composePrompt(),
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
      notify("Do-over limit reached", `You've used all ${REGEN_CAP} do-overs for this video.`);
      return;
    }
    runRender((seed) => {
      setVideo((v) => (v ? { ...v, seed: seed || newSeed(), regens: v.regens + 1 } : v));
    });
  }

  function onSave() {
    if (!video) return;
    addVideo(video);
    notify("Saved to your library", "Share it anytime from Library.");
    resetToIdle();
  }

  function onShare() {
    if (!video) return;
    const nav = typeof navigator !== "undefined" ? (navigator as Navigator) : undefined;
    if (Platform.OS === "web" && nav && "share" in nav) {
      nav.share({ title: "Catloop", text: "Made with Catloop" }).catch(() => {});
    } else {
      notify("Share", "Your video is ready for TikTok, Reels, or Shorts.");
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
    <Zoomies animateKey={phase} style={styles.flex}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {phase === "done" && video ? (
          <View style={{ gap: spacing(4) }}>
            <Badge label="Your video" tone="ember" />
            <PounceIn>
              <LoopPreview photoUri={video.photoUri} seed={video.seed} />
            </PounceIn>
            <View style={styles.metaRow}>
              <Caption>
                Do-overs used: {video.regens}/{REGEN_CAP}
              </Caption>
              <TextButton label="Report" color={colors.ember} onPress={() => reportOutput(resetToIdle)} />
            </View>
            <View style={styles.actionRow}>
              <SecondaryButton
                label="Do it again"
                onPress={onRegen}
                disabled={video.regens >= REGEN_CAP}
                style={styles.flex}
              />
              <SecondaryButton label="Share" onPress={onShare} style={styles.flex} />
            </View>
            <PrimaryButton label="Save to library" onPress={onSave} />
            <TextButton label="Start over" onPress={resetToIdle} color={colors.inkDim} style={styles.centerLink} />
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
                <View>
                  <Caption style={styles.sectionLabel}>Pick a vibe</Caption>
                  <View style={styles.chipRow}>
                    {STYLES.map((s, idx) => (
                      <PounceIn key={s} delay={idx * 60}>
                        <Chip label={s} active={style === s} onPress={() => setStyle(s)} />
                      </PounceIn>
                    ))}
                  </View>
                </View>

                <Card style={{ gap: spacing(2), padding: spacing(4) }}>
                  <Caption style={styles.sectionLabel}>Caption or mood (optional)</Caption>
                  <TextInput
                    value={prompt}
                    onChangeText={setPrompt}
                    placeholder="e.g. sleepy tabby in a cozy sunbeam"
                    placeholderTextColor={colors.inkFaint}
                    style={styles.input}
                    multiline
                  />
                </Card>

                <View style={styles.creditRow}>
                  <Badge
                    label={
                      isSubscribed(state.entitlement)
                        ? `${state.videoCreditsRemaining} credit${state.videoCreditsRemaining === 1 ? "" : "s"} left`
                        : "No active plan"
                    }
                    tone={isSubscribed(state.entitlement) ? "ember" : "gold"}
                  />
                  <Caption>8s · best-in-class</Caption>
                </View>

                <PrimaryButton label="Make my video" onPress={onGenerate} />
                <Caption style={styles.disclaimer}>
                  Videos are AI-generated. Your photo and prompt are sent to a third-party video model to create the
                  clip. {PRICING.regenCap} do-overs max per video.
                </Caption>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </Zoomies>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing(5), paddingBottom: spacing(10), gap: spacing(4) },
  previewWrap: { width: "100%" },
  dropzone: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  dropInner: { alignItems: "center", gap: 10 },
  dropEmoji: { fontSize: 72 },
  center: { textAlign: "center" },
  sectionLabel: { marginBottom: spacing(2) },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing(2) },
  input: { fontFamily: font.body, color: colors.ink, fontSize: 15, minHeight: 44, paddingVertical: 6 },
  creditRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  disclaimer: {},
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  actionRow: { flexDirection: "row", gap: spacing(3) },
  centerLink: { textAlign: "center", alignSelf: "center" },
});
