import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleProp, ViewStyle } from "react-native";
import { easing } from "../theme";

/**
 * Motion system per motion-concept.md. Every curve has overshoot/settle —
 * nothing in Catloop moves on a flat linear or standard ease.
 */

// 1. Pounce-In — cards/buttons/chips entering. scale 0.85→1.04→1.0, opacity
// 0→1 over first 40%, 380ms, back-out spring. Stagger groups by 60ms.
export function PounceIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const p = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.timing(p, {
      toValue: 1,
      duration: 380,
      delay,
      easing: Easing.bezier(...easing.pounce),
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [p, delay]);

  const scale = p.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] });
  const opacity = p.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] });
  return <Animated.View style={[{ opacity, transform: [{ scale }] }, style]}>{children}</Animated.View>;
}

// 2. Purr-Loop — the one calm moment. scale 1→1.05→1, 1800ms, infinite.
export function PurrLoop({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const p = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(p, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        Animated.timing(p, { toValue: 0, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [p]);
  const scale = p.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  return <Animated.View style={[{ transform: [{ scale }] }, style]}>{children}</Animated.View>;
}

// 3. Zoomies — forward-progress screen transitions. translateX 24→0,
// scale 0.97→1, opacity 0→1, 260ms, fast-out gentle settle. Re-fires on key.
export function Zoomies({
  children,
  animateKey,
  style,
}: {
  children: React.ReactNode;
  animateKey: string | number;
  style?: StyleProp<ViewStyle>;
}) {
  const p = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    p.setValue(0);
    const anim = Animated.timing(p, {
      toValue: 1,
      duration: 260,
      easing: Easing.bezier(...easing.zoomies),
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [p, animateKey]);
  const translateX = p.interpolate({ inputRange: [0, 1], outputRange: [24, 0] });
  const scale = p.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] });
  return (
    <Animated.View style={[{ flex: 1, opacity: p, transform: [{ translateX }, { scale }] }, style]}>
      {children}
    </Animated.View>
  );
}

// 4. Tail-Flick — success/tap micro-confirmation. rotate 0→-4→3→0, 220ms.
// Fires on success, never while waiting. Applied to the tapped element only.
export function useTailFlick() {
  const r = useRef(new Animated.Value(0)).current;
  const flick = () => {
    r.setValue(0);
    Animated.timing(r, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };
  const rotate = r.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ["0deg", "-4deg", "3deg", "0deg"],
  });
  return { flick, style: { transform: [{ rotate }] } };
}

// Pressable that plays Tail-Flick on press. Used by buttons/chips.
export function TapFlick({
  children,
  onPress,
  disabled,
  style,
  accessibilityLabel,
  accessibilityRole = "button",
}: {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityRole?: "button" | "link";
}) {
  const { flick, style: flickStyle } = useTailFlick();
  return (
    <Pressable
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        if (disabled) return;
        flick();
        onPress();
      }}
      style={({ pressed }) => [{ opacity: disabled ? 0.5 : pressed ? 0.9 : 1 }, style]}
    >
      <Animated.View style={flickStyle}>{children}</Animated.View>
    </Pressable>
  );
}
