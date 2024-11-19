'use client';

import { useTimer } from '@/contexts/TimerContext';

interface ClockProps {
  round: number;
}

export function Clock({ round }: ClockProps) {
  const { timeLeft } = useTimer();

  return (
    <div className="absolute top-10 right-20 text-center flex flex-col items-center">
      <svg width="96" height="96" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="#2563eb"
          strokeWidth="12"
          fill="none"
          strokeDasharray={2 * Math.PI * 54}
          strokeDashoffset={(1 - (timeLeft as number) / 122) * 2 * Math.PI * 54}
          transform="rotate(-90 60 60)"
        />
      </svg>
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
