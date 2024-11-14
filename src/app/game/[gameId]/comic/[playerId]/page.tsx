import { Clock } from '@/components/clock';
import ComicForm from '@/components/comicForm';
import { comicService } from '@/services/comic';
import { gameService } from '@/services/game';
import { redirect } from 'next/navigation';
import Comic from './comic';

type GamePageProps = {
  params: Promise<{
    gameId: string;
    playerId: string;
  }>;
  searchParams: Promise<{ [round: string]: string | string[] | undefined }>;
};

export default async function ComicPage({
  params,
  searchParams,
}: GamePageProps) {
  const { gameId, playerId } = await params;
  const round = (await searchParams).round as string;

  const { snapShot } = await gameService.getGameById(gameId);
  const realRound = snapShot.val().round;
  const queue = snapShot.val().queue as string[][];
  const pos = queue[0].findIndex((player) => player === playerId);

  let nextPlayer = '';
  if (realRound === 0) {
    nextPlayer = playerId;
  } else if (realRound < queue.length) {
    nextPlayer = queue[realRound][pos];
  }

  const comic = await comicService.getComic(gameId, playerId);

  if (realRound != round) {
    redirect(`/game/${gameId}/comic/${playerId}?round=${realRound}`);
  }

  return (
    <div className="flex flex-col mt-16 items-center w-full relative">
      {round === '0' ? (
        <ComicForm gameId={gameId} />
      ) : (
        <h1 className="text-4xl">{comic.title}</h1>
      )}
      <Clock gameId={gameId} playerId={nextPlayer} round={realRound} />

      <div className="flex flex-row gap-4 mt-8">
        <div className="flex flex-col gap-4">
          <Comic gameId={gameId} round={realRound} active />
          <Comic gameId={gameId} round={realRound} />
        </div>
        <div className="flex flex-col gap-4">
          <Comic gameId={gameId} round={realRound} />
          <Comic gameId={gameId} round={realRound} />
        </div>
      </div>
    </div>
  );
}
