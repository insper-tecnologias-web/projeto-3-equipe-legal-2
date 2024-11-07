import { database } from "@/lib/firebase";
import { push, ref, set } from "firebase/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "O campo 'name' é obrigatório." }, { status: 400 });
    }

    const gameRef = push(ref(database, "games"));

    if (gameRef.key) {
      const hostId = uuid();
      const newGame = {
        status: "WAITING",
        players: {
          [hostId]: { name: name, isHost: true },
        },
      };

      await set(gameRef, newGame);
      (await cookies()).set("player_token", hostId);
    }

    return NextResponse.json({ gameId: gameRef.key });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ocorreu um erro ao criar o jogo." }, { status: 500 });
  }
}
