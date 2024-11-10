import { database } from "@/lib/firebase";
import { PlayerProps } from "@/types";
import { DatabaseReference, get, ref, set } from "firebase/database";
import Cookies from "js-cookie";

const getPlayerById = async (gameId: string): Promise<{ player: PlayerProps }> => {
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

const logoutPlayer = (gameId: string): void => {
  try {
    const playerToken = Cookies.get('player_token');

    set(ref(database, `games/${gameId}/players/${playerToken}`), null);
  } catch {
    throw new Error('Erro ao excluir');
  }
};

export const playerService = { getPlayerById, logoutPlayer, getAllPlayers };
