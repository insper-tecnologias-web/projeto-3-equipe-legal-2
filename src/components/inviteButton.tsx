'use client';

import { useState } from 'react';

export function InviteButton() {
  const [copiado, setCopiado] = useState(false);

  const handleCopiarURL = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000); // Reseta após 2 segundos
      })
      .catch((err) => {
        console.error('Falha ao copiar a URL: ', err);
      });
  };

  return (
    <button
      className="font-semibold text-xl hover:underline p-2 mt-8 border-4 border-zinc-900"
      onClick={handleCopiarURL}
    >
      {copiado ? 'Link copiado' : 'Convidar'}
    </button>
  );
}
