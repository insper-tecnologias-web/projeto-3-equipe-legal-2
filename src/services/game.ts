import { database } from "@/lib/firebase";
import { DataSnapshot, get, push, ref, set, update } from "firebase/database";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";

const getGameById = async (gameId: string): Promise<{ snapShot: DataSnapshot }> => {
  try {
    const gameRef = ref(database, `games/${gameId}`);
    const snapShot = await get(gameRef);

    if (!snapShot.exists()) {
      throw new Error("O jogador não existe");
    }

    return { snapShot };
  } catch {
    throw new Error("Erro ao buscar o jogo");
  }
};

const getPlayers = async (gameId: string): Promise<{ snapShot: DataSnapshot }> => {
  try {
    const playersRef = ref(database, `games/${gameId}/players`);
    const snapShot = await get(playersRef);

    if (!snapShot.exists()) {
      throw new Error("O jogo não tem jogadores");
    }

    return { snapShot };
  } catch (error) {
    throw new Error(`Erro: ${error}`);
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

  Cookies.set("player_token", playerId);
};

const createGame = async (name: string): Promise<{ gameId: string }> => {
  const gameRef = push(ref(database, "games"));

  if (!gameRef.key) {
    throw new Error("Erro ao criar o jogo");
  }

  const hostId = uuid();
  const newGame = {
    status: "WAITING",
    players: {
      [hostId]: { name: name, isHost: true },
    },
  };

  await set(gameRef, newGame);
  Cookies.set("player_token", hostId);

  return { gameId: gameRef.key };
};

const startGame = async (gameId: string) => {
  const gameRef = ref(database, `games/${gameId}/status`);
  
  if (!gameRef.key) {
    throw new Error("Erro ao inicializar o jogo");
  }

  await update(gameRef, {'value': "PLAYING"})
}

export const gameService = { getGameById, getPlayers, addPlayer, createGame, startGame };
