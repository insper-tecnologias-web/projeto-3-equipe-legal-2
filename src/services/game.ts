import axios from "axios";
import { DataSnapshot } from "firebase/database";

const getGameById = async (gameId: string): Promise<DataSnapshot | null> => {
  try {
    const response = await axios.get(`/api/games/${gameId}`);

    return response.data;
  } catch {
    return null;
  }
};

export const gameService = { getGameById };
