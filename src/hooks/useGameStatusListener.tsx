import { database } from '@/lib/firebase';
import { onValue, ref } from 'firebase/database';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function useGameStatusListener(gameId: string) {
  const router = useRouter();
  const playerId = Cookies.get('player_token');

  useEffect(() => {
    const gameStatusRef = ref(database, `games/${gameId}/status`);

    const unsubscribe = onValue(gameStatusRef, (snapshot) => {
      const gameStatus = snapshot.val();

      if (gameStatus === 'PLAYING') {
        console.log('O jogo começou! Redirecionando para a página do jogo...');
        router.push(`/game/${gameId}/comic/${playerId}`);
      }
    });

    return () => unsubscribe();
  }, [gameId, router, playerId]);
}

export default useGameStatusListener;
