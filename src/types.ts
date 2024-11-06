export interface PlayerProps {
  playerId: string;
  name: string;
  isHost: boolean;
  game: {
    gameId: string;
  };
}
