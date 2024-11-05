import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "O campo 'name' é obrigatório." }, { status: 400 });
    }

    const game = await prisma.game.create({
      data: {
        status: "WAITING",
        players: {
          create: {
            name: name as string,
            isHost: true,
          },
        },
      },
      select: {
        gameId: true,
        players: {
          select: {
            playerId: true,
          },
          where: {
            isHost: true,
          },
        },
      },
    });

    (await cookies()).set("player_token", game.players[0].playerId);

    return NextResponse.json({ gameId: game.gameId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ocorreu um erro ao criar o jogo." }, { status: 500 });
  }
}
