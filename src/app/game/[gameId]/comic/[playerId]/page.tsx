import { Clock } from '@/components/clock';
import ComicForm from '@/components/comicForm';
import { comicService } from '@/services/comic';
import { gameService } from '@/services/game';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type GamePageProps = {
  params: Promise<{
    gameId: string;
    playerId: string;
  }>;
  searchParams: Promise<{ [round: string]: string | string[] | undefined }>;
};

export default async function Comic({ params, searchParams }: GamePageProps) {
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
          <Image src="/comic1.svg" alt="Comic 1" width={655} height={355} />
          <Image src="/comic4.svg" alt="Comic 4" width={550} height={355} />
        </div>
        <div className="flex flex-col gap-4">
          <Image src="/comic2.svg" alt="Comic 2" width={550} height={355} />
          <Image
            className="-translate-x-24"
            src="/comic3.svg"
            alt="Comic 5"
            width={655}
            height={355}
          />
        </div>
      </div>
    </div>
  );
}
