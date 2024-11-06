"use client";

import { InviteButton } from "@/components/inviteButton";
import StartButton from "@/components/startButton";
import { AuthContext } from "@/contexts/AuthContext";
import { PlayerProps } from "@/types";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export function Player({ gameId }: { gameId: string }) {
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  const { player, isLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlayers = async () => {
      const request = await axios.get(`/api/games/${gameId}`);

      setPlayers(request.data.players);
    };

    if (gameId) {
      fetchPlayers();
    }
  }, [gameId]);

  if (isLoading || !players.length) return;

  return (
    <>
      <div className="text-xl flex gap-5">
        {players.map((player) => (
          <div key={player.playerId} className="w-60 h-60 flex items-center justify-center border-4 border-zinc-900">
            <p>{player.name}</p>
          </div>
        ))}
        {Array.from({ length: 4 - players.length }).map((_, idx) => (
          <div
            key={idx}
            className="flex w-60 h-60 border-4 px-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"
          >
            <p>Esperando jogador</p>
          </div>
        ))}
      </div>
      {player ? (
        <>
          <div className="flex gap-5">
            <StartButton gameId={player.game.gameId} disabled={players.length === 1} />
            <InviteButton />
          </div>
        </>
      ) : (
        <InviteButton />
      )}
    </>
  );
}
