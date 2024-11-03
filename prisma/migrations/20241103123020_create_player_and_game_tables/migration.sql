/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('WAITING', 'PLAYING', 'FINISHED');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "players" (
    "playerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isHost" BOOLEAN NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "games" (
    "gameId" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("gameId")
);

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
