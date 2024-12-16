export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}