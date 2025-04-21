export interface AuthState {
  user: User | null;
}

export interface AuthActions {
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export interface User {
  id: number;
  username: string;
  image?: string;
}
