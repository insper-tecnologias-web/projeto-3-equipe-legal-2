import { database } from '@/lib/firebase';
import { PlayerProps } from '@/types';
import { DatabaseReference, get, ref, set, update } from 'firebase/database';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

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

export const playerService = {
  getPlayerById,
  addPlayer,
  logoutPlayer,
  getAllPlayers,
};
