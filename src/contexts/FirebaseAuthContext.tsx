import { firebaseApp } from "@services";
import { User } from "@types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

const auth = getAuth(firebaseApp);

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthContextValue extends State {
  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAutheticated(true);
          setUser({
            id: user.uid,
            avatar: user.photoURL || "",
            email: user.email || "",
            name: user.displayName || "",
          });
        } else {
          setIsAutheticated(false);
          setUser(null);
        }
        setIsInitialized(true);
      }),
    []
  );

  const _signInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  };

  const _createUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isInitialized,
      user,
      createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
      signInWithEmailAndPassword: _signInWithEmailAndPassword,
      signInWithGoogle,
      logout,
    }),
    [
      isAuthenticated,
      isInitialized,
      user,
      _createUserWithEmailAndPassword,
      _signInWithEmailAndPassword,
      signInWithGoogle,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthConsumer = AuthContext.Consumer;
