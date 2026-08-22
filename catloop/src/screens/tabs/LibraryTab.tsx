import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoopPreview } from "../../components/LoopPreview";
import { PounceIn } from "../../components/motion";
import { Body, Title } from "../../components/ui";
import { useStore } from "../../state/store";
import { colors, font, spacing } from "../../theme";

export function LibraryTab({ onOpen }: { onOpen: (id: string) => void }) {
  const { state } = useStore();

  if (state.library.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emoji}>🎬</Text>
        <Title style={styles.center}>No videos yet</Title>
        <Body style={styles.center}>Videos you save from Create show up here. Only you can see them.</Body>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {state.library.map((v, idx) => (
          <PounceIn key={v.id} delay={idx * 60} style={styles.tile}>
            <Pressable onPress={() => onOpen(v.id)}>
              <LoopPreview photoUri={v.photoUri} seed={v.seed} />
              <Text style={styles.tileMeta} numberOfLines={1}>
                {v.prompt ? v.prompt : "Cat video"}
              </Text>
            </Pressable>
          </PounceIn>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: spacing(5), paddingBottom: spacing(10) },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing(3) },
  tile: { width: "47%", gap: 6 },
  tileMeta: { fontFamily: font.medium, color: colors.inkDim, fontSize: 13 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing(3), padding: spacing(8) },
  emoji: { fontSize: 64 },
  center: { textAlign: "center" },
});
