import { database } from '@/lib/firebase';
import { get, ref, update } from 'firebase/database';
import Cookies from 'js-cookie';

const getComic = async (
  gameId: string,
  playerId?: string,
): Promise<{ drawings: string[]; title: string }> => {
  if (!playerId) {
    playerId = Cookies.get('player_token');
  }
  const comicRef = ref(database, `games/${gameId}/players/${playerId}/comic`);
  const snapShot = await get(comicRef);

  const comic = snapShot.val() as { drawings: string[]; title: string };
  return comic;
};

const addDrawing = async (
  gameId: string,
  playerId: string,
  data: string,
  round: number,
): Promise<void> => {
  const comicRef = ref(
    database,
    `games/${gameId}/players/${playerId}/comic/drawings`,
  );

  await update(comicRef, { [round - 1]: data });
};

const addTitle = async (gameId: string, title: string): Promise<void> => {
  const playerId = Cookies.get('player_token');
  const comicRef = ref(database, `games/${gameId}/players/${playerId}/comic`);

  await update(comicRef, { title });
};

export const comicService = { getComic, addDrawing, addTitle };
