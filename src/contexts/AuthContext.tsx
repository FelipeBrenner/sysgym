import { usersDatabase } from "@database";
import { firebaseApp } from "@services";
import { IUser } from "@types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const auth = getAuth(firebaseApp);

export interface IUpdateUserProps {
  name?: string;
  avatar?: string;
}

export interface AuthContextValue {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  updateUser: (user: IUpdateUserProps) => Promise<void>;
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
  updateUser: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const updateUser = async ({
    name = user?.name ?? "",
    avatar = user?.avatar ?? "",
  }: IUpdateUserProps) => {
    if (auth.currentUser && user) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: avatar,
        });

        const updatedUser = {
          ...user,
          name,
          avatar,
        };

        await usersDatabase.updateUser(updatedUser);

        setUser(updatedUser);
        toast.success("Nome alterado com sucesso!");
      } catch (error) {
        toast.error("Erro ao alterar o nome!");
        console.error(error);
      }
    }
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsAutheticated(true);
          const dbUser = await usersDatabase.getUser(user.uid);

          if (dbUser) {
            setUser(dbUser);
          } else {
            const newUser: IUser = {
              id: user.uid,
              avatar: user.photoURL || "",
              email: user.email || "",
              name: user.displayName || "",
            };

            usersDatabase.createUser(newUser);
            setUser(newUser);
          }
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
      updateUser,
      createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
      signInWithEmailAndPassword: _signInWithEmailAndPassword,
      signInWithGoogle,
      logout,
    }),
    [
      isAuthenticated,
      isInitialized,
      user,
      updateUser,
      _createUserWithEmailAndPassword,
      _signInWithEmailAndPassword,
      signInWithGoogle,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthConsumer = AuthContext.Consumer;
