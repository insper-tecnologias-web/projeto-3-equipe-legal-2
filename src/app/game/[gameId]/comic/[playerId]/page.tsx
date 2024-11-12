import Image from 'next/image';
import ComicForm from '@/components/comicForm';

type GamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function Comic({ params }: GamePageProps) {
  const { gameId } = await params;

  return (
    <div className="relative flex flex-col items-center w-full">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={86}
        className="absolute right-10 mt-8 mb-10"
      />
      <ComicForm gameId={gameId} />

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
