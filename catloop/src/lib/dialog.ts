import { Alert, Platform } from "react-native";

export function notify(title: string, message?: string) {
  if (Platform.OS === "web") {
    // eslint-disable-next-line no-alert
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}

export function confirmAction(
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => void,
  destructive = false
) {
  if (Platform.OS === "web") {
    // eslint-disable-next-line no-alert
    if (window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: "Cancel", style: "cancel" },
    {
      text: confirmLabel,
      style: destructive ? "destructive" : "default",
      onPress: onConfirm,
    },
  ]);
}

export function reportOutput(onDone?: () => void) {
  const reasons =
    "Report this AI-generated video?\n\nWe review flagged clips for unsafe, incorrect, or harmful output. Reporting also removes it from your library.";
  confirmAction("Report AI output", reasons, "Report", () => {
    notify("Thanks — report received", "Our team will review this clip.");
    onDone?.();
  }, true);
}
