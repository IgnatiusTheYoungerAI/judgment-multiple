import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { PaywallScreen } from "./screens/PaywallScreen";
import { MainScreen } from "./screens/MainScreen";
import { PreviewScreen } from "./screens/PreviewScreen";
import { useStore } from "./state/store";

export type RootStackParamList = {
  Onboarding: undefined;
  Paywall: { context?: "onboarding" | "locked" } | undefined;
  Main: undefined;
  Preview: { videoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { state } = useStore();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      initialRouteName={state.onboarded ? "Main" : "Onboarding"}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen
        name="Preview"
        component={PreviewScreen}
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
}
