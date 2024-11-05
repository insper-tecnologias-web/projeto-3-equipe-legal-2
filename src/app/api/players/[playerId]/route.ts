import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;

  try {
    const player = await prisma.player.findUnique({
      where: {
        playerId,
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Jogador não encontrado" }, { status: 404 });
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
