import BackArrow from "@/components/backArrow";
import { database } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Player } from "./player";

type GamePageProps = {
  params: Promise<{
    gameId: string;
  }>;
};

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  const gameRef = ref(database, `games/${gameId}`);
  const snapShot = await get(gameRef);

  if (!snapShot.exists()) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <BackArrow gameId={gameId} />
      <Image src="/logo.svg" alt="Logo" width={560} height={240} className="mt-10 mb-10" />

      <Player gameId={gameId} />
    </div>
  );
}
