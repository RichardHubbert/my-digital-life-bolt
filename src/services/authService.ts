import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { SignUpData, SignInData, AuthUser } from '../types/auth';

export const authService = {
  async signUp({ email, password, name }: SignUpData): Promise<AuthUser> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    return {
      uid: user.uid,
      email: user.email,
      displayName: name
    };
  },

  async signIn({ email, password }: SignInData): Promise<AuthUser> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
  },

  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },

  formatUser(user: User | null): AuthUser | null {
    if (!user) return null;
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
  }
};