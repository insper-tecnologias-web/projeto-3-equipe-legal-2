import { database } from '@/lib/firebase';
import { onValue, ref } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useChangeRound(gameId: string, playerId: string, round: number) {
  const router = useRouter();

  useEffect(() => {
    const gameRef = ref(database, `games/${gameId}/status`);
    const unsubscribe = onValue(gameRef, async (snapshot) => {
      if (snapshot.val() === 'nextRound') {
        router.push(`/game/${gameId}/comic/${playerId}?round=${round}`);
      }
    });

    return () => unsubscribe();
  }, [gameId, playerId, round, router]);
}

export default useChangeRound;
