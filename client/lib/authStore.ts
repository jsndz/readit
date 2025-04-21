import { AuthState, AuthActions, User } from "@/utils/types";
import { create } from "zustand";

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  logout: () => set((state) => ({ user: null })),
}));
