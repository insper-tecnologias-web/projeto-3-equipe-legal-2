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

    // Listener para monitorar mudanças no gameStatus
    const unsubscribe = onValue(gameStatusRef, (snapshot) => {
      const gameStatus = snapshot.val();

      // Verifica se o status foi alterado para "PLAYING"
      if (gameStatus === 'PLAYING') {
        console.log('O jogo começou! Redirecionando para a página do jogo...');
        router.push(`/game/${gameId}/comic/${playerId}`);
      }
    });

    // Limpeza do listener ao desmontar o componente
    return () => unsubscribe();
  }, [gameId, router, playerId]);
}

export default useGameStatusListener;
