'use client';

import useGameTimer from '@/hooks/useGameTimer';

interface ClockProps {
  gameId: string;
  playerId: string;
  round: number;
}

export function Clock({ gameId, playerId, round }: ClockProps) {
  const timeLeft = useGameTimer(gameId, playerId, round);

  return (
    <div className="absolute top-0 right-20 text-center flex flex-col items-center">
      <div className="font-semibold pt-9 text-xl text-center border-2 border-zinc-700 w-[6rem] h-[6rem] rounded-full">
        {timeLeft}
      </div>
      <p className="mt-4">Round {round} de 4</p>
      {round === 0 ? (
        <p className="font-semibold">
          Coloque um título <br /> para o seu quadrinho
        </p>
      ) : (
        <p className="font-semibold">
          Clique no quadrinho <br /> para desenhar
        </p>
      )}
    </div>
  );
}
