'use client';

import { playerService } from '@/services/player';
import { PlayerProps } from '@/types';
import { onValue } from 'firebase/database';
import Cookies from 'js-cookie';
import { useParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AuthContextData {
  player: PlayerProps | null;
  players: Record<
    string,
    {
      name: string;
      isHost: boolean;
    }
  > | null;
  fetchPlayer: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [players, setPlayers] = useState<AuthContextData['players'] | null>(
    null,
  );
  const [player, setPlayer] = useState<PlayerProps | null>(null);
  const { gameId } = useParams();

  const fetchPlayer = useCallback(async () => {
    const playerId = Cookies.get('player_token');
    const { player } = await playerService.getPlayerById(
      gameId as string,
      playerId as string,
    );

    setPlayer(player);
  }, [gameId]);

  useEffect(() => {
    const { playersRef } = playerService.getAllPlayers(gameId as string);

    const unsubscribe = onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      setPlayers(data || {});
    });

    fetchPlayer();
    return () => unsubscribe();
  }, [gameId, fetchPlayer]);

  const contextValue = useMemo(
    () => ({
      player,
      players,
      fetchPlayer,
    }),
    [player, players, fetchPlayer],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
