import { comicService } from '@/services/comic';
import { playerService } from '@/services/player';
import { get } from 'firebase/database';
import Image from 'next/image';

type GamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

type ComicProps = Record<
  string,
  { name: string; drawings: string[]; title: string }
>[];

export default async function Results({ params }: GamePageProps) {
  const { gameId } = await params;

  const { playersRef } = playerService.getAllPlayers(gameId);
  const players = (await get(playersRef)).val();
  const playerIds = Object.keys(players);

  const comicsList: ComicProps = [];

  await Promise.all(
    playerIds.map(async (playerId) => {
      const playerComic = await comicService.getComic(gameId, playerId);
      comicsList.push({
        [playerId]: {
          name: players[playerId].name,
          drawings: playerComic['drawings'],
          title: playerComic['title'],
        },
      });
    }),
  );

  return (
    <div className="flex flex-col gap-10 my-16">
      {comicsList.map((comic) =>
        Object.entries(comic).map(([playerId, val]) => (
          <div
            key={playerId}
            className="flex w-full gap-5 items-center justify-center flex-col"
          >
            <div className="flex gap-2 items-end">
              <p className="text-xl">{val.name} em:</p>
              <h1 className="text-4xl">{val.title}</h1>
            </div>

            <div className="flex gap-4 flex-wrap justify-center max-w-screen-xl">
              {val.drawings.map((drawing, drawingIndex) => (
                <Image
                  key={`${playerId}-${drawingIndex}`}
                  src={drawing}
                  alt={`Quadrinho ${drawingIndex + 1}`}
                  width={600}
                  height={350}
                  className="border-zinc-900 border-4"
                />
              ))}
            </div>
          </div>
        )),
      )}
    </div>
  );
}
