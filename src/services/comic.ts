import { database } from '@/lib/firebase';
import { get, ref, update } from 'firebase/database';
import Cookies from 'js-cookie';

const getComic = async (gameId: string): Promise<Record<string, string>> => {
  const playerId = Cookies.get('player_token');
  const comicRef = ref(database, `games/${gameId}/players/${playerId}/comic`);

  const drawings = (await get(comicRef)).val() as Record<string, string>;

  return drawings;
};

const addDrawing = async (
  gameId: string,
  data: string,
  round: number,
): Promise<void> => {
  const playerId = Cookies.get('player_token');
  const comicRef = ref(database, `games/${gameId}/players/${playerId}/comic`);

  await update(comicRef, { [round]: data });
};

export const comicService = { getComic, addDrawing };
