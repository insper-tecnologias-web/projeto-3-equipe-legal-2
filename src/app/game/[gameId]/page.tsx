import Exit from '@/components/exit';
import { gameService } from '@/services/game';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Player } from './player';

type GamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  try {
    await gameService.getGameById(gameId);
  } catch {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Exit gameId={gameId} />
      <Image
        src="/logo.svg"
        alt="Logo"
        width={560}
        height={240}
        className="mt-10 mb-10"
      />

      <Player gameId={gameId} />
    </div>
  );
}
