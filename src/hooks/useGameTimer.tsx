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
    const roundRef = ref(database, `games/${gameId}/round`);

    let interval: NodeJS.Timeout | null = null;

    const unsubscribeRound = onValue(roundRef, (snapshot) => {
      const newRound = snapshot.val();
      if (newRound !== round) {
        if (newRound <= 4) {
          router.push(`/game/${gameId}/comic/${playerId}?round=${newRound}`);
        } else {
          router.push(`/game/${gameId}/results`);
        }
      }
    });

    const unsubscribeEndTime = onValue(endTimeRef, (snapshot) => {
      const endTime = snapshot.val();

      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      if (endTime) {
        interval = setInterval(() => {
          const currentTime = Date.now();
          const timeRemaining = Math.max(0, endTime - currentTime);
          setTimeLeft(Math.floor(timeRemaining / 1000));

          if (timeRemaining <= 0) {
            if (isHost) {
              gameService.handleRoundCompletion(gameId, round);
            }
            clearInterval(interval!);
            interval = null;
          }
        }, 1000);
      } else {
        setTimeLeft(null);
      }
    });

    return () => {
      unsubscribeRound();
      unsubscribeEndTime();
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameId, router, playerId, round, isHost]);

  return timeLeft;
}

export default useGameTimer;
