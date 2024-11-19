'use client';

import { gameService } from '@/services/game';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Form() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { gameId } = await gameService.createGame(name);

      router.push(`game/${gameId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col h-full justify-center items-center p-2"
      onSubmit={handleCreateGame}
    >
      <label className="font-semibold text-center text-wrap text-3xl w-4/5 mb-4">
        Escreva o nome do seu personagem ou grupo e crie a sala
      </label>
      <input
        className="text-black mb-3 w-3/5 p-1 rounded-lg border-2 border-zinc-900"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="font-semibold text-xl hover:underline" type="submit">
        Criar sala
      </button>
    </form>
  );
}
