import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type Entitlement = "none" | "trial" | "weekly";

export const REGEN_CAP = 3; // hard cap per video (server-enforced in production)
export const TRIAL_VIDEOS = 3;
export const WEEKLY_VIDEOS = 1;

export interface VideoItem {
  id: string;
  createdAt: number;
  prompt: string;
  photoUri?: string;
  source: "demo" | "user";
  regens: number;
  seed: number;
}

export interface AppState {
  ready: boolean;
  onboarded: boolean;
  entitlement: Entitlement;
  videoCreditsRemaining: number;
  library: VideoItem[];
}

const STORAGE_KEY = "catloop.state.v1";

const initialState: AppState = {
  ready: false,
  onboarded: false,
  entitlement: "none",
  videoCreditsRemaining: 0,
  library: [],
};

type Action =
  | { type: "HYDRATE"; payload: Partial<AppState> }
  | { type: "MARK_ONBOARDED" }
  | { type: "START_TRIAL" }
  | { type: "RESTORE_WEEKLY" }
  | { type: "CONSUME_CREDIT" }
  | { type: "ADD_VIDEO"; payload: VideoItem }
  | { type: "REGEN_VIDEO"; id: string; seed: number }
  | { type: "DELETE_VIDEO"; id: string }
  | { type: "RESET" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload, ready: true };
    case "MARK_ONBOARDED":
      return { ...state, onboarded: true };
    case "START_TRIAL":
      return {
        ...state,
        entitlement: "trial",
        videoCreditsRemaining: TRIAL_VIDEOS,
      };
    case "RESTORE_WEEKLY":
      return {
        ...state,
        entitlement: "weekly",
        videoCreditsRemaining: Math.max(state.videoCreditsRemaining, WEEKLY_VIDEOS),
      };
    case "CONSUME_CREDIT":
      return {
        ...state,
        videoCreditsRemaining: Math.max(0, state.videoCreditsRemaining - 1),
      };
    case "ADD_VIDEO":
      return { ...state, library: [action.payload, ...state.library] };
    case "REGEN_VIDEO":
      return {
        ...state,
        library: state.library.map((v) =>
          v.id === action.id && v.regens < REGEN_CAP
            ? { ...v, regens: v.regens + 1, seed: action.seed }
            : v
        ),
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        library: state.library.filter((v) => v.id !== action.id),
      };
    case "RESET":
      return { ...initialState, ready: true };
    default:
      return state;
  }
}

interface Store {
  state: AppState;
  markOnboarded: () => void;
  startTrial: () => void;
  restoreWeekly: () => void;
  consumeCredit: () => void;
  addVideo: (item: VideoItem) => void;
  regenVideo: (id: string, seed: number) => void;
  deleteVideo: (id: string) => void;
  reset: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        const payload: Partial<AppState> = raw ? JSON.parse(raw) : {};
        if (active) dispatch({ type: "HYDRATE", payload });
      } catch {
        if (active) dispatch({ type: "HYDRATE", payload: {} });
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    const { ready, ...persisted } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted)).catch(() => {});
  }, [state]);

  const store = useMemo<Store>(
    () => ({
      state,
      markOnboarded: () => dispatch({ type: "MARK_ONBOARDED" }),
      startTrial: () => dispatch({ type: "START_TRIAL" }),
      restoreWeekly: () => dispatch({ type: "RESTORE_WEEKLY" }),
      consumeCredit: () => dispatch({ type: "CONSUME_CREDIT" }),
      addVideo: (item) => dispatch({ type: "ADD_VIDEO", payload: item }),
      regenVideo: (id, seed) => dispatch({ type: "REGEN_VIDEO", id, seed }),
      deleteVideo: (id) => dispatch({ type: "DELETE_VIDEO", id }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state]
  );

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within AppProvider");
  return ctx;
}

export function isSubscribed(entitlement: Entitlement): boolean {
  return entitlement === "trial" || entitlement === "weekly";
}
