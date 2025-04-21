export interface AuthState {
  user: User | null;
}

export interface AuthActions {
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export interface User {
  ID: number;
  Username: string;
  Image?: string;
  Email: string;
}
