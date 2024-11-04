"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const createGame = async (formData: FormData) => {
  const content = formData.get("name");

  await prisma.game
    .create({
      data: {
        status: "WAITING",
        players: {
          create: {
            name: content as string,
            isHost: true,
          },
        },
      },
    })
    .then((game) => redirect(`/game/${game.gameId}`));
};