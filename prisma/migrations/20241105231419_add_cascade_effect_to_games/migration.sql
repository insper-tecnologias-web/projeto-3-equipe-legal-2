-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_gameId_fkey";

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;
