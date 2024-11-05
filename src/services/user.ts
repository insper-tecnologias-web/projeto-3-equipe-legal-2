import axios from "axios";

const getUserById = async (playerId: string) => {
  try {
    const response = await axios.get(`/api/players/${playerId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const userService = { getUserById };
