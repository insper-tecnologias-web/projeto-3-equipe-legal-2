import { database } from '@/lib/firebase';
import { PlayerProps } from '@/types';
import { DatabaseReference, get, ref, set, update } from 'firebase/database';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';
import { gameService } from './game';

const getPlayerById = async (
  gameId: string,
): Promise<{ player: PlayerProps }> => {
  try {
    const playerToken = Cookies.get('player_token');
    const playerRef = ref(database, `games/${gameId}/players/${playerToken}`);
    const snapShot = get(playerRef);
    const player = (await snapShot).val();

    return { player };
  } catch {
    throw new Error('Erro ao buscar jogador');
  }
};

const getAllPlayers = (gameId: string): { playersRef: DatabaseReference } => {
  try {
    const playersRef = ref(database, `games/${gameId}/players`);

    return { playersRef };
  } catch {
    throw new Error('Erro ao buscar jogadores');
  }
};

const addPlayer = async (gameId: string, name: string): Promise<void> => {
  const playerId = uuid();
  const playerRef = ref(database, `games/${gameId}/players/${playerId}`);

  const playerData = {
    name,
    isHost: false,
    ready: false,
  };

  await update(playerRef, playerData);

  Cookies.set('player_token', playerId);
};

const logoutPlayer = (gameId: string): void => {
  try {
    const playerToken = Cookies.get('player_token');

    set(ref(database, `games/${gameId}/players/${playerToken}`), null);
  } catch {
    throw new Error('Erro ao excluir');
  }
};

const playerReady = async (
  gameId: string,
  save: boolean,
  round: number,
): Promise<void> => {
  const playerId = Cookies.get('player_token');
  const saveRef = ref(database, `games/${gameId}/players/${playerId}/ready`);

  await update(saveRef, { save });

  const playersRef = ref(database, `games/${gameId}/players`);
  const playersSnapshot = await get(playersRef);
  const players = playersSnapshot.val();

  let allReady = true;
  for (const playerKey in players) {
    const player = players[playerKey];
    if (!player.ready) {
      allReady = false;
      console.log(`Player ${playerKey} is not ready.`);
      break;
    }
  }

  if (allReady) {
    gameService.nextRound(gameId, round + 1);
    if (playerId) {
      await update(ref(database, `games/${gameId}`), {
        status: 'nextRound',
      });

      setTimeout(async () => {
        const updates: Record<string, unknown> = {};
        for (const playerKey in players) {
          updates[`/players/${playerKey}/ready`] = false;
        }

        updates[`/status`] = 'PLAYING';
        await update(ref(database, `games/${gameId}`), updates);
        console.log('Game status reset to PLAYING for the next round.');
      }, 1000); // Adjust delay as needed
    }
  } else {
    console.log('nãopode');
  }
};

export const playerService = {
  getPlayerById,
  addPlayer,
  logoutPlayer,
  getAllPlayers,
  playerReady,
};
