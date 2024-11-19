'use client';

import { comicService } from '@/services/comic';
import { playerService } from '@/services/player';
import { useState } from 'react';

type ComicFormProps = {
  gameId: string;
  playerName: string;
};

export default function ComicForm({ gameId, playerName }: ComicFormProps) {
  const [isReady, setIsReady] = useState(false);

  const toggleSave = () => {
    if (isReady) {
      playerService.playerReady(gameId, !isReady);
    }

    setIsReady((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const comicText = (form.elements.namedItem('comicText') as HTMLInputElement)
      .value;
    await comicService.addTitle(gameId, comicText);
    playerService.playerReady(gameId, !isReady);
    setIsReady(true);
  };

  return (
    <form
      className="flex text-4xl max-w-screen-lg w-full text-center items-center"
      onSubmit={handleSubmit}
    >
      <p className="text-xl">{playerName} em:</p>
      <input
        className="flex-1 text-center h-full outline-none"
        type="text"
        name="comicText"
        id="comicText"
        placeholder="Escreva o título da sua tirinha!"
        disabled={isReady}
      />
      {isReady ? (
        <div className="ml-4 cursor-pointer" onClick={toggleSave}>
          Editar
        </div>
      ) : (
        <button className="ml-4" type="submit">
          Salvar
        </button>
      )}
    </form>
  );
}
