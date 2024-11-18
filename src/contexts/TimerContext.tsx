'use client';

import useGameTimer from '@/hooks/useGameTimer';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface TimerContextData {
  timeLeft: number | null;
}

interface TimerProviderProps {
  gameId: string;
  playerId: string;
  isHost: boolean;
  round: number;
  children: ReactNode;
}

export const TimerContext = createContext({} as TimerContextData);

export function TimerProvider({
  gameId,
  playerId,
  isHost,
  round,
  children,
}: TimerProviderProps) {
  const timeLeft = useGameTimer(gameId, playerId, isHost, round);

  const contextValue = useMemo(
    () => ({
      timeLeft,
    }),
    [timeLeft],
  );

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = (): TimerContextData => {
  const context = useContext(TimerContext);

  if (context === undefined) {
    throw new Error('useTimer deve ser usado dentro de um TimerProvider');
  }

  return context;
};
