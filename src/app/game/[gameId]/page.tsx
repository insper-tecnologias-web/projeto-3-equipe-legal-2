import BackArrow from "@/components/backArrow";
import StartButton from "@/components/startButton";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Player } from "./player";

type GamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  const game = await prisma.game.findUnique({
    where: {
      gameId,
    },
  });

  if (!game) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <BackArrow />
      <Image src="/logo.svg" alt="Logo" width={560} height={240} className="mt-10 mb-10" />

      <div className="flex justify-center space-x-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-60 h-60 flex items-center justify-center border-4 border-zinc-900">
            <span className="text-lg">Jogador {index + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <div className="flex w-60 h-60 border-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"></div>
        <div className="flex w-60 h-60 border-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"></div>
        <div className="flex w-60 h-60 border-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"></div>
        <div className="flex w-60 h-60 border-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"></div>
      </div>

      <StartButton gameId={gameId} />
      <Player />
    </div>
  );
}
