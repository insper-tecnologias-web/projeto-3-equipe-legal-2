"use client";

import { InviteButton } from "@/components/inviteButton";
import StartButton from "@/components/startButton";
import { database } from "@/lib/firebase";
import { PlayerProps } from "@/types";
import { get, onValue, ref, update } from "firebase/database";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export function Player({ gameId }: { gameId: string }) {
  const [players, setPlayers] = useState(
    {} as Record<
      string,
      {
        name: string;
        isHost: boolean;
      }
    >
  );
  const [player, setPlayer] = useState<PlayerProps | null>(null);
  const [name, setName] = useState("");

  const fetchPlayer = useCallback(async () => {
    const playerToken = Cookies.get("player_token");
    const playerRef = ref(database, `games/${gameId}/players/${playerToken}`);

    const snapshot = await get(playerRef);

    if (snapshot.exists()) {
      console.log(snapshot.val());
      setPlayer(snapshot.val());
    }
  }, [gameId]);

  const handleJoinGame = async () => {
    const playerId = uuid();
    const playerRef = ref(database, `games/${gameId}/players/${playerId}`);

    const playerData = {
      name,
      isHost: false,
    };

    await update(playerRef, playerData);

    Cookies.set("player_token", playerId);

    setName("");
    fetchPlayer();
  };

  useEffect(() => {
    const playersRef = ref(database, `games/${gameId}/players`);

    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      setPlayers(data || {});
    });

    fetchPlayer();
  }, [gameId, fetchPlayer]);

  if (!Object.keys(players).length) return;

  return (
    <>
      <div className="text-xl flex gap-5">
        {Object.keys(players).map((playerId) => (
          <div key={playerId} className="w-60 h-60 flex items-center justify-center border-4 border-zinc-900">
            <p>{players[playerId].name}</p>
          </div>
        ))}
        {Array.from({ length: 4 - Object.keys(players).length }).map((_, idx) => (
          <div
            key={idx}
            className="flex w-60 h-60 border-4 px-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"
          >
            <p>Esperando jogador</p>
          </div>
        ))}
      </div>
      {player ? (
        <div className="flex gap-5">
          {player.isHost && <StartButton gameId={gameId} disabled={Object.keys(players).length === 1} />}
          <InviteButton />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-4">
          <h1>Coloque o seu nome para jogar</h1>
          <input
            className="text-black max-w-48 p-1 rounded-lg border-2 border-zinc-900"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button className="font-semibold text-xl hover:underline" onClick={handleJoinGame}>
            Entrar
          </button>
        </div>
      )}
    </>
  );
}
