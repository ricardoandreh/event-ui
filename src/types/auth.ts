export interface AuthState {
  token: string | null;
  expiration: number | null;
  isPending: boolean;
  refreshToken: string | null;
}
