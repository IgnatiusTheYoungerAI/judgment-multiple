import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoopPreview } from "../components/LoopPreview";
import { Badge, Body, PrimaryButton, SecondaryButton, TextButton } from "../components/ui";
import { notify, reportOutput } from "../lib/dialog";
import { REGEN_CAP, useStore } from "../state/store";
import { RootStackParamList } from "../navigation";
import { colors, font, spacing } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "Preview">;

export function PreviewScreen({ navigation, route }: Props) {
  const { state, deleteVideo } = useStore();
  const video = state.library.find((v) => v.id === route.params.videoId);

  function close() {
    navigation.goBack();
  }

  if (!video) {
    return (
      <SafeAreaView style={styles.safe}>
        <Body style={{ textAlign: "center", marginTop: spacing(10) }}>Video not found.</Body>
        <PrimaryButton label="Close" onPress={close} style={{ margin: spacing(6) }} />
      </SafeAreaView>
    );
  }

  function onShare() {
    const nav = typeof navigator !== "undefined" ? (navigator as Navigator) : undefined;
    if (Platform.OS === "web" && nav && "share" in nav) {
      nav.share({ title: "CatLoop", text: "Made with CatLoop — AI cat video maker" }).catch(() => {});
    } else {
      notify("Share", "Your AI video is ready to share to TikTok, Reels, or Shorts.");
    }
  }

  function onDelete() {
    if (!video) return;
    deleteVideo(video.id);
    notify("Deleted", "This video was removed from your library.");
    close();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable onPress={close} hitSlop={12} accessibilityLabel="Close">
          <Text style={styles.close}>✕</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Badge label="AI-generated · 8s" tone="ai" />
        <LoopPreview photoUri={video.photoUri} seed={video.seed} />
        {video.prompt ? <Body style={styles.prompt}>&ldquo;{video.prompt}&rdquo;</Body> : null}
        <Body style={styles.meta}>
          Regenerations used: {video.regens}/{REGEN_CAP}
        </Body>
        <View style={styles.actions}>
          <SecondaryButton label="Share" onPress={onShare} style={styles.flex} />
          <SecondaryButton label="Delete" onPress={onDelete} style={styles.flex} />
        </View>
        <TextButton
          label="Report AI output"
          color={colors.danger}
          onPress={() => reportOutput(() => onDelete())}
          style={styles.reportLink}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: { paddingHorizontal: spacing(5), paddingTop: spacing(2), alignItems: "flex-end" },
  close: { color: colors.textDim, fontSize: 20, padding: 4 },
  scroll: { padding: spacing(5), gap: spacing(4), paddingBottom: spacing(10) },
  prompt: { fontFamily: font.medium, color: colors.text, fontSize: 16, fontStyle: "italic" },
  meta: { fontSize: 13 },
  actions: { flexDirection: "row", gap: spacing(3) },
  flex: { flex: 1 },
  reportLink: { textAlign: "center", alignSelf: "center", marginTop: spacing(2) },
});
