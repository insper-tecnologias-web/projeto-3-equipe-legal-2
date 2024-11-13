'use client';

import { comicService } from '@/services/comic';
import { useState } from 'react';

type ComicFormProps = {
  gameId: string;
};

export default function ComicForm({ gameId }: ComicFormProps) {
  const [save, setSave] = useState(false);

  const toggleSave = () => {
    setSave((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const comicText = (form.elements.namedItem('comicText') as HTMLInputElement)
      .value;
    await comicService.addTitle(gameId, comicText);
    setSave(true);
  };

  return (
    <form
      className="flex text-4xl max-w-screen-xl w-full text-center items-center"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full text-center h-full outline-none"
        type="text"
        name="comicText"
        id="comicText"
        placeholder="Escreva o título da sua tirinha!"
        disabled={save}
      />
      {save ? (
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
