'use client'
import axios from 'axios';
import { redirect } from "next/navigation";


export default function StartButton({ gameId }: { gameId: string }) {
    const handleStartGame = () => {
        axios.put(`/api/games/${gameId}`, {
            gameId: gameId,
            status: 'PLAYING',
        })

        redirect(`/game/${gameId}/draw?1`);
    }

    return (
        <button
            className="font-semibold text-xl hover:underline p-2 mt-8 border-4 border-zinc-900"
            onClick={handleStartGame}
        >
            Iniciar jogo
        </button>
    )
}
