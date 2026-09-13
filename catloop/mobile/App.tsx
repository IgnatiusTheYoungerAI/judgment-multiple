import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { STYLE_PRESETS } from './src/config/pricing';
import {
  applySuccessfulAttempt,
  creditsAfterIntroPurchase,
  emptyCredits,
  type CreditState,
} from './src/lib/credits';
import { generateVideo } from './src/api/generate';
import { colors } from './src/theme';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AiConsentScreen } from './src/screens/AiConsentScreen';
import { PaywallScreen } from './src/screens/PaywallScreen';
import { CreateScreen } from './src/screens/CreateScreen';
import { PreviewScreen } from './src/screens/PreviewScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

type Route = 'onboarding' | 'consent' | 'paywall' | 'create' | 'preview' | 'settings';

export default function App() {
  const [route, setRoute] = useState<Route>('onboarding');
  const [credits, setCredits] = useState<CreditState>(emptyCredits());
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | undefined>();
  const [lastPayload, setLastPayload] = useState<{ uri: string; presetId: string; mood: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const attemptsRemaining = credits.attemptsRemainingOnActive;

  const screen = useMemo(() => {
    switch (route) {
      case 'onboarding':
        return <OnboardingScreen onContinue={() => setRoute('consent')} />;
      case 'consent':
        return <AiConsentScreen onAgreed={() => setRoute('paywall')} onSkip={() => setRoute('onboarding')} />;
      case 'paywall':
        return (
          <PaywallScreen
            onPurchased={() => {
              setCredits(creditsAfterIntroPurchase());
              setRoute('create');
            }}
          />
        );
      case 'create':
        return (
          <CreateScreen
            credits={credits}
            onOpenSettings={() => setRoute('settings')}
            onGenerate={async (payload) => {
              setLastPayload(payload);
              setBusy(true);
              setRoute('preview');
              setPreviewUri(payload.uri);
              const preset = STYLE_PRESETS.find((p) => p.id === payload.presetId);
              const res = await generateVideo({
                localUri: payload.uri,
                presetId: payload.presetId,
                mood: `${preset?.prompt ?? ''} ${payload.mood}`.trim(),
                mode: 'new',
              });
              setBusy(false);
              if (!res.ok) {
                Alert.alert('Generation failed', res.error);
                setRoute('create');
                return;
              }
              setJobId(res.jobId);
              setPreviewUri(res.videoUrl);
              setCredits((c) => applySuccessfulAttempt(c, 'new'));
            }}
          />
        );
      case 'preview':
        return (
          <PreviewScreen
            uri={previewUri ?? ''}
            busy={busy}
            attemptsRemaining={attemptsRemaining}
            onDone={() => setRoute('create')}
            onReport={() => Alert.alert('Reported', 'Thanks — we will review this output.')}
            onRegen={async () => {
              if (!lastPayload || attemptsRemaining <= 0) return;
              setBusy(true);
              const preset = STYLE_PRESETS.find((p) => p.id === lastPayload.presetId);
              const res = await generateVideo({
                localUri: lastPayload.uri,
                presetId: lastPayload.presetId,
                mood: `${preset?.prompt ?? ''} ${lastPayload.mood}`.trim(),
                mode: 'regen',
                jobId,
              });
              setBusy(false);
              if (!res.ok) {
                Alert.alert('Regen failed', res.error);
                return;
              }
              setPreviewUri(res.videoUrl);
              setCredits((c) => applySuccessfulAttempt(c, 'regen'));
            }}
          />
        );
      case 'settings':
        return <SettingsScreen onBack={() => setRoute('create')} />;
    }
  }, [route, credits, previewUri, busy, attemptsRemaining, lastPayload, jobId]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar style="light" />
        {screen}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
