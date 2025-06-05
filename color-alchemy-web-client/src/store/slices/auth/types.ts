export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  stats: {
    wins: number;
    losses: number;
  };
  role: "user" | "admin";
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setError: (error: string | null) => void;
}

export type AuthSlice = AuthState & AuthActions;
