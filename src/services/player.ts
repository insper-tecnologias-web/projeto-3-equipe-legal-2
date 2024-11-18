import { database } from '@/lib/firebase';
import { PlayerProps } from '@/types';
import { DatabaseReference, get, ref, set, update } from 'firebase/database';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';
import { gameService } from './game';

const getPlayerById = async (
  gameId: string,
  playerId: string,
): Promise<{ player: PlayerProps }> => {
  try {
    const playerRef = ref(database, `games/${gameId}/players/${playerId}`);
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

const playerReady = async (gameId: string, isReady: boolean): Promise<void> => {
  const playerId = Cookies.get('player_token');
  const saveRef = ref(database, `games/${gameId}/players/${playerId}`);

  await update(saveRef, { ready: isReady });

  const playersRef = ref(database, `games/${gameId}/players`);
  const playersSnapshot = await get(playersRef);
  const players = playersSnapshot.val();

  let allReady = true;
  for (const playerKey in players) {
    const player = players[playerKey];
    if (!player.ready) {
      allReady = false;
      break;
    }
  }

  if (allReady) {
    const gameRef = ref(database, `games/${gameId}`);
    const gameSnapshot = await get(gameRef);
    const gameData = gameSnapshot.val();
    const currentRound = gameData.round;

    for (const playerKey in players) {
      if (players[playerKey].isHost) {
        await gameService.handleRoundCompletion(gameId, currentRound);
      }
      await update(ref(database, `games/${gameId}/players/${playerKey}`), {
        ready: false,
      });
    }
  }
};

export const playerService = {
  getPlayerById,
  addPlayer,
  logoutPlayer,
  getAllPlayers,
  playerReady,
};
