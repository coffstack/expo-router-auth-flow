import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  function logIn() {
    setIsLoggedIn(true);
    router.replace("/");
  }

  function logOut() {
    setIsLoggedIn(false);
    router.replace("/login");
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
