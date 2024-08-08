import { v4 as uuid } from 'uuid';

export const sendReady = (
  setPlayerId: React.Dispatch<React.SetStateAction<string>>,
  lobbyNsp: any,
) => {
  const newPlayerId = uuid();
  setPlayerId(newPlayerId);
  return lobbyNsp.emit('ready', newPlayerId);
};

interface IData {
  scores: {
    player1Score: number
    player2Score: number
  }
  ids: {
    player1Id: string
    player2Id: string
  }
}

export const updatePlayer2Score = (
  data: IData,
  playerId: string,
  setPlayer2Score: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (data.ids.player2Id !== playerId) {
    setPlayer2Score(data.scores.player2Score);
  }
};
