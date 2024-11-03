"use server";

import { prisma } from "@/lib/prisma";

export const createGame = async (formData: FormData) => {
  const content = formData.get("name");

  await prisma.game.create({
    data: {
      status: "WAITING",
      players: {
        create: {
          name: content as string,
          isHost: true,
        },
      },
    },
  });
};