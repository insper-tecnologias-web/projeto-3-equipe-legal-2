import { Clock } from '@/components/clock';
import ComicForm from '@/components/comicForm';
import { TimerProvider } from '@/contexts/TimerContext';
import { comicService } from '@/services/comic';
import { gameService } from '@/services/game';
import { playerService } from '@/services/player';
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

  const { player } = await playerService.getPlayerById(gameId, playerId);
  const comic = await comicService.getComic(gameId, playerId);

  const activeComics = [false, false, false, false];
  if (realRound > 0 && realRound <= 4) activeComics[realRound - 1] = true;

  return (
    <TimerProvider
      gameId={gameId}
      playerId={nextPlayer}
      isHost={player.isHost}
      round={realRound}
    >
      <div className="flex flex-col mt-16 items-center w-full relative">
        {round === '0' ? (
          <ComicForm gameId={gameId} playerName={player.name} />
        ) : (
          <h1 className="text-4xl">
            {player.name} em: {comic.title}
          </h1>
        )}
        <Clock round={realRound} />

        <div className="flex flex-row gap-4 mt-8">
          <div className="flex flex-col gap-4">
            <Comic
              gameId={gameId}
              playerId={playerId}
              round={1}
              active={activeComics[0]}
            />
            <Comic
              gameId={gameId}
              playerId={playerId}
              round={3}
              active={activeComics[2]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Comic
              gameId={gameId}
              playerId={playerId}
              round={2}
              active={activeComics[1]}
            />
            <Comic
              gameId={gameId}
              playerId={playerId}
              round={4}
              active={activeComics[3]}
            />
          </div>
        </div>
      </div>
    </TimerProvider>
  );
}
