'use client';

import { InviteButton } from '@/components/inviteButton';
import StartButton from '@/components/startButton';
import { AuthContext } from '@/contexts/AuthContext';
import useGameStatusListener from '@/hooks/useGameStatusListener';
import { playerService } from '@/services/player';
import Image from 'next/image';
import { useContext, useState } from 'react';

export function Player({ gameId }: { gameId: string }) {
  const { players, fetchPlayer, player } = useContext(AuthContext);
  const [name, setName] = useState('');
  useGameStatusListener(gameId);

  const handleJoinGame = async () => {
    await playerService.addPlayer(gameId, name);

    setName('');
    fetchPlayer();
  };

  if (!players || !Object.keys(players).length) return;

  return (
    <>
      <div className="relative text-xl flex gap-5">
        {Object.keys(players)
          .reverse()
          .map((playerId) => (
            <div key={playerId}>
              {players[playerId].isHost && (
                <Image
                  src="/crown.svg"
                  className="absolute -top-8"
                  width={40}
                  height={40}
                  alt={'Coroa'}
                />
              )}
              <div className="w-60 h-60 flex items-center justify-center border-4 border-zinc-900">
                <p>{players[playerId].name}</p>
              </div>
            </div>
          ))}
        {Array.from({ length: 4 - Object.keys(players).length }).map(
          (_, idx) => (
            <div
              key={idx}
              className="flex w-60 h-60 border-4 px-4 border-dashed border-zinc-700 rounded-md text-center justify-center items-center"
            >
              <p>Esperando jogador</p>
            </div>
          ),
        )}
      </div>
      {player ? (
        <div className="flex gap-5">
          {player.isHost && (
            <StartButton
              gameId={gameId}
              disabled={Object.keys(players).length !== 4}
            />
          )}
          <InviteButton />
        </div>
      ) : (
        <>
          {Object.keys(players).length < 4 ? (
            <div className="mt-8 flex flex-col items-center gap-4">
              <h1>Coloque o nome do seu personagem ou grupo</h1>
              <input
                className="text-black max-w-48 p-1 rounded-lg border-2 border-zinc-900"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button
                className="font-semibold text-xl hover:underline"
                onClick={handleJoinGame}
              >
                Entrar
              </button>
            </div>
          ) : (
            <p className="mt-8 text-xl">A sala está cheia</p>
          )}
        </>
      )}
    </>
  );
}
