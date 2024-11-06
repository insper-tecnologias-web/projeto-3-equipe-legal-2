import { PlayerProps } from "@/types";
import axios from "axios";

const getUserById = async (playerId: string): Promise<PlayerProps | null> => {
  const response = await axios.get<PlayerProps | null>(`/api/players/${playerId}`);

  return response.data;
};

export const userService = { getUserById };
