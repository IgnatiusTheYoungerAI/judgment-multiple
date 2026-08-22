import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation";
import { colors, font, spacing } from "../theme";
import { CreateTab } from "./tabs/CreateTab";
import { LibraryTab } from "./tabs/LibraryTab";
import { SettingsTab } from "./tabs/SettingsTab";

type Props = NativeStackScreenProps<RootStackParamList, "Main">;
type Tab = "create" | "library" | "settings";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "create", label: "Create", icon: "✨" },
  { key: "library", label: "Library", icon: "🎬" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

const TITLES: Record<Tab, string> = {
  create: "Create",
  library: "Your library",
  settings: "Settings",
};

export function MainScreen({ navigation }: Props) {
  const [tab, setTab] = useState<Tab>("create");

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Catloop</Text>
        <Text style={styles.headerTitle}>{TITLES[tab]}</Text>
      </View>

      <View style={styles.content}>
        {tab === "create" && (
          <CreateTab onLocked={() => navigation.navigate("Paywall", { context: "locked" })} />
        )}
        {tab === "library" && <LibraryTab onOpen={(id) => navigation.navigate("Preview", { videoId: id })} />}
        {tab === "settings" && (
          <SettingsTab onReset={() => navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] })} />
        )}
      </View>

      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <Pressable key={t.key} style={styles.tabItem} onPress={() => setTab(t.key)}>
              <Text style={[styles.tabIcon, { opacity: active ? 1 : 0.45 }]}>{t.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{t.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  header: {
    paddingHorizontal: spacing(5),
    paddingTop: spacing(2),
    paddingBottom: spacing(3),
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  brand: { fontFamily: font.display, color: colors.ember, fontSize: 26 },
  headerTitle: { fontFamily: font.semi, color: colors.inkDim, fontSize: 15 },
  content: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
  },
  tabItem: { flex: 1, alignItems: "center", gap: 3, paddingVertical: 4 },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontFamily: font.medium, color: colors.inkFaint, fontSize: 12 },
  tabLabelActive: { color: colors.ember },
});
