// components/GameForm.tsx
"use client"; // Indica que este é um componente cliente

import { createGame } from '@/actions/create-game';

export default function GameForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Previne o envio padrão do formulário

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name")?.toString();

        // Verifica se o campo "name" está vazio
        if (!name) {
            alert("Por favor, insira um nickname."); // Exibe um alerta se o campo estiver vazio
            return; // Interrompe o envio do formulário
        }

        // Se o nome estiver preenchido, submete o formulário
        event.currentTarget.submit(); // Envia o formulário
    };

    return (
        <form
            className="flex flex-col w-full p-2"
            action={createGame}
            onSubmit={handleSubmit}
        >
            <label className="text-xl font-semibold text-center mb-6">
                Escreva um nickname e cria a sua sala
            </label>
            <input
                className="text-black mb-3 p-1 rounded-lg"
                type="text"
                name="name"
            />
            <button className="font-semibold" type="submit">
                Create Game
            </button>
        </form>
    );
}
