export interface AuthState {
  username?: string | null;
  token?: string | null;
  role?: string | null;
  loading?: boolean | null;
}

export interface LoginPayload {
  username?: string | null;
  token?: string | null;
  role?: string | null;
}
