export interface SignInResponse {
  displayName: string;
  idToken: string;
  email: string;
  kind: string;
  localId: string;
  registered?: boolean;
  // refreshToken: string;
  // expiresIn?: string;
}
