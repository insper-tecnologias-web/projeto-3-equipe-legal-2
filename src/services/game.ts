import { database } from '@/lib/firebase';
import { DataSnapshot, get, push, ref, set, update } from 'firebase/database';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

const getGameById = async (
  gameId: string,
): Promise<{ snapShot: DataSnapshot }> => {
  try {
    const gameRef = ref(database, `games/${gameId}`);
    const snapShot = await get(gameRef);

    if (!snapShot.exists()) {
      throw new Error('O jogo não existe');
    }

    return { snapShot };
  } catch {
    throw new Error('Erro ao buscar o jogo');
  }
};

const createGame = async (name: string): Promise<{ gameId: string }> => {
  const gameRef = push(ref(database, 'games'));

  if (!gameRef.key) {
    throw new Error('Erro ao criar o jogo');
  }

  const hostId = uuid();
  const newGame = {
    status: 'WAITING',
    players: {
      [hostId]: { name: name, isHost: true, ready: false },
    },
  };

  await set(gameRef, newGame);
  Cookies.set('player_token', hostId);

  return { gameId: gameRef.key };
};

const startGame = async (gameId: string) => {
  const gameRef = ref(database, `games/${gameId}`);
  const playersRef = ref(database, `games/${gameId}/players`);
  const players = (await get(playersRef)).val() as Record<string, string>;
  const playerIds = Object.keys(players);
  const endTime = Date.now() + 62 * 2 * 1000;

  const n = playerIds.length;
  const square: string[][] = [];

  for (let i = 0; i < n; i++) {
    const row = playerIds.slice(i).concat(playerIds.slice(0, i));
    square.push(row);
  }

  await update(gameRef, {
    status: 'STARTED',
    round: 0,
    endTime,
    queue: square,
  });
};

const finishGame = async (gameId: string) => {
  const gameRef = ref(database, `games/${gameId}`);

  await update(gameRef, { status: 'FINISHED' });
};

const nextRound = async (gameId: string, round: number) => {
  const endTime = Date.now() + 62 * 2 * 1000;
  const gameRef = ref(database, `games/${gameId}`);

  await update(gameRef, { round, endTime, status: 'PLAYING' });
};

const handleRoundCompletion = async (gameId: string, round: number) => {
  if (round === 4) {
    await gameService.finishGame(gameId);
  } else {
    await gameService.nextRound(gameId, round + 1);
  }
};

export const gameService = {
  getGameById,
  createGame,
  startGame,
  finishGame,
  nextRound,
  handleRoundCompletion,
};
