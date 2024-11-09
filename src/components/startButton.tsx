"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import { gameService } from "@/services/game"
import { playerService } from "@/services/player"

type StartButtonProps = {
  gameId: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function StartButton({ gameId, ...props }: StartButtonProps) {
  const handleStartGame = async () => {
    gameService.startGame(gameId);
    playerService.redirectPlayers(gameId);
  };

  return (
    <button
      {...props}
      className="font-semibold text-xl hover:underline p-2 mt-8 border-4 border-zinc-900 disabled:border-zinc-500 disabled:hover:no-underline disabled:text-zinc-500"
      onClick={handleStartGame}
    >
      Iniciar jogo
    </button>
  );
}
