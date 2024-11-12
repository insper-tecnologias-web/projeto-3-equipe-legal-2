'use client';

import { comicService } from '@/services/comic';
import React from 'react';

type ComicFormProps = {
  gameId: string;
};

export default function ComicForm({ gameId }: ComicFormProps) {
  const [hasComicTitle, setHasComicTitle] = React.useState(false);

  const handleEdit = () => {
    setHasComicTitle(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const comicText = (form.elements.namedItem('comicText') as HTMLInputElement)
      .value;
    await comicService.addTitle(gameId, comicText);
    setHasComicTitle(true);
  };

  return (
    <form
      className="flex mt-16 text-4xl decoration-none w-2/3 text-center"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full text-center"
        type="text"
        name="comicText"
        id="comicText"
        placeholder="Escreva o título da sua tirinha!"
        disabled={hasComicTitle}
      />
      {hasComicTitle ? (
        <div className="ml-4" onClick={handleEdit}>
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
