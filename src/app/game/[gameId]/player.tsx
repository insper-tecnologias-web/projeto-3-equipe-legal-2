"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function Player() {
  const { isPlaying, player, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return;
  }

  console.log(player);

  return (
    <>
      {isPlaying && <p>O Jogador está jogando!</p>}
      <div>
        <p>{player.name}</p>
        <p>{player.isHost ? "Host" : "Guest"}</p>
      </div>
    </>
  );
}
