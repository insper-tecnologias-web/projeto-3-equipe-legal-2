import { database } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse, { params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;

  try {
    const gameRef = ref(database, `games/${gameId}`);
    const snapShot = await get(gameRef);

    if (!snapShot.exists()) {
      return NextResponse.json({ error: "Jogo não encontrado" }, { status: 404 });
    }

    return NextResponse.json(snapShot, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
