import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
};

SplashScreen.preventAutoHideAsync();

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

const AUTH_STATE_KEY = "authState";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  async function storeAuthState(newState: { isLoggedIn: boolean }) {
    try {
      await AsyncStorage.setItem(AUTH_STATE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error(error);
    }
  }

  function logIn() {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  }

  function logOut() {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
    router.replace("/login");
  }

  useEffect(() => {
    async function loadAuthState() {
      try {
        // simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const authState = await AsyncStorage.getItem(AUTH_STATE_KEY);
        if (authState) {
          setIsLoggedIn(JSON.parse(authState).isLoggedIn);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    }
    loadAuthState();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
