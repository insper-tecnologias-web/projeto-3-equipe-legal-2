"use client";

import { useState } from "react";

export function Form() {
  const [name, setName] = useState("");

  const hanldeCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        window.location.href = `/game/${data.gameId}`;
      } else {
        console.error("Erro ao criar o jogo:", data.error);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form className="flex flex-col h-full justify-center items-center p-2" onSubmit={hanldeCreateGame}>
      <label className="font-semibold text-center text-wrap text-3xl w-4/5 mb-4">
        Escreva um nickname e crie a sua sala
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
