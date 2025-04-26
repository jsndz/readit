import { AuthState, AuthActions, User } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthStore = AuthState &
  AuthActions & {
    getUser: () => number | null;
  };

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: User | null) => set(() => ({ user })),
      logout: () => set(() => ({ user: null })),
      getUser: () => get().user?.ID!,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
