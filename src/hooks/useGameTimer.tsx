import { database } from '@/lib/firebase';
import { gameService } from '@/services/game';
import { onValue, ref } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useGameTimer(
  gameId: string,
  playerId: string,
  isHost: boolean,
  round: number,
) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const endTimeRef = ref(database, `games/${gameId}/endTime`);

    const unsubscribe = onValue(endTimeRef, (snapshot) => {
      const endTime = snapshot.val();

      if (endTime) {
        const interval = setInterval(() => {
          const currentTime = Date.now();
          const timeRemaining = Math.max(0, endTime - currentTime);
          setTimeLeft(Math.floor(timeRemaining / 1000));

          if (timeRemaining <= 0) {
            if (isHost) {
              gameService.nextRound(gameId, round + 1);
            }
            clearInterval(interval);
            router.push(`/game/${gameId}/comic/${playerId}?round=${round + 1}`);
          }
        }, 1000);

        return () => clearInterval(interval);
      } else {
        setTimeLeft(null);
      }
    });

    return () => unsubscribe();
  }, [gameId, router, playerId, round, isHost]);

  return timeLeft;
}

export default useGameTimer;
