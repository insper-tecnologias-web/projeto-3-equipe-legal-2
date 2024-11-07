"use client";

import { userService } from "@/services/user";
import { PlayerProps } from "@/types";
import Cookies from "js-cookie";
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";

interface AuthContextData {
  player?: PlayerProps;
  isPlaying: boolean;
  isLoading: boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [player, setPlayer] = useState<PlayerProps | undefined>();

  const fetchPlayer = useCallback(async (playerId: string) => {
    setIsLoading(true);

    try {
      const player = await userService.getUserById(playerId);

      if (player) {
        setPlayer(player);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    Cookies.remove("player_token");

    window.location.href = "/";
  };

  // useEffect(() => {
  //   const playerToken = Cookies.get("player_token");

  //   if (playerToken) {
  //     setIsPlaying(true);

  //     fetchPlayer(playerToken);
  //   }
  // }, [fetchPlayer]);

  const contextValue = useMemo(
    () => ({
      isPlaying,
      player,
      isLoading,
      logout,
    }),
    [isPlaying, player, isLoading]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
